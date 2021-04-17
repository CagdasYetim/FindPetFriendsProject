

using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        public async Task SaveProfileSetting(AppUser User,SettingDto setting)
        {
            User.ShowName = setting.ShowName;
            User.SendNotification = setting.SendNotification;
            User.ShowLastLocation = setting.ShowLastLocation;

            foreach(string elem in setting.IHave)
            {
            
                if(!IHaveExist(elem,User.IHaves))
                    User.IHaves.Add(new IHave{
                        AppUser = User,
                        AppUserId = User.Id,
                        Value = elem
                    });
            }

            foreach(string elem1 in setting.CanJoin)
            {
                if (!CanJoinExist(elem1, User.CanJoins))
                    User.CanJoins.Add(new CanJoin {
                        AppUser = User,
                        AppUserId = User.Id,
                        Value = elem1
                    });
            }
            
        }

        private bool IHaveExist(string elem,ICollection<IHave> list)
        {
            return (
                    from e in list
                    where e.Value.Equals(elem)
                    select e
                   )
                   .ToList()
                   .Any();  
        }

        private bool CanJoinExist(string elem, ICollection<CanJoin> list)
        {
            return (
                    from e in list
                    where e.Value.Equals(elem)
                    select e
                   )
                   .ToList()
                   .Any();
        }
    }
}
