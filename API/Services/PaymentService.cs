using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;

        }

        public async Task<PaymentIntent> CreateOrUpadtePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

            var deliveryFree = subtotal > 10000 ? 0 : 500;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions()
                {
                    Amount = subtotal + deliveryFree,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" },
                };

                intent = await service.CreateAsync(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFree,
                };

                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return intent;
        }
    }
}