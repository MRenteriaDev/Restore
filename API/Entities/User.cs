using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}