using System.Linq;
using API.DTOs;
using API.Entities.OrderAgregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToDto(this IQueryable<Order> query)
        {
            return query
                    .Select(order => new OrderDto
                    {
                        Id = order.Id,
                        BuyerId = order.BuyerId,
                        OrderDate = order.OrderDate,
                        ShippingAddress = order.ShippingAddress,
                        DeliveryFree = order.DeliveryFree,
                        Subtotal = order.Subtotal,
                        OrderStatus = order.OrderStatus.ToString(),
                        Total = order.GetTotal(),
                        OrderItems = order.OrderItems.Select(item => new OrderItemDto
                        {
                            ProductId = item.ItemOrdered.ProductId,
                            Name = item.ItemOrdered.Name,
                            PictureUrl = item.ItemOrdered.PictureUrl,
                            Price = item.Price,
                            Quantity = item.Quantity
                        }).ToList()
                    }).AsNoTracking();
        }
    }
}