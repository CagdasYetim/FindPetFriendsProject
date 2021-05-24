using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserNotificationRepository
    {
        public void AddUserNotification(NotificationDto notification, int userId);
        public Task<UserNotification> GetUserNotification(int userId);
        public void SendNotificationToAll(string title,string content);
        public Task SendNotificationToUser(string title, string content,int userId);
    }
}
