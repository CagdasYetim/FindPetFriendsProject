using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindPetFriendsBackend.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
    }
}
