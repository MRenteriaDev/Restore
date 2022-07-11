using System.IO;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAgregate;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        private readonly PaymentService _paymentService;
        private readonly IConfiguration _config;
        public PaymentsController(PaymentService paymentService, StoreContext storeContext, IConfiguration config)
        {
            _paymentService = paymentService;
            _storeContext = storeContext;
            _config = config;

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _storeContext.Baskets
            .RetrieveBasketBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if (basket == null) return NotFound();

            var intent = await _paymentService.CreateOrUpadtePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment Intent" });

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _storeContext.Update(basket);

            var result = await _storeContext.SaveChangesAsync() > 0;
            if (!result) return BadRequest(new ProblemDetails { Title = "Problem Updating Basket Intent" });

            return basket.MapBasketToDto();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripedWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripedEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
            _config["StripeSettings:WhSecret"]);

            var charge = (Charge)stripedEvent.Data.Object;

            var order = await _storeContext.Orders.FirstOrDefaultAsync(x =>
                x.PaymentIntentId == charge.PaymentIntentId);

            if (charge.Status == "succeeded") order.OrderStatus = OrderStatus.PaymentRecieved;

            await _storeContext.SaveChangesAsync();

            return new EmptyResult();
        }
    }
}