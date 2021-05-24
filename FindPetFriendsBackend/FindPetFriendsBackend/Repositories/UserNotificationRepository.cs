using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using WebPush;

namespace API.Repositories
{
    public class UserNotificationRepository : IUserNotificationRepository
    {

        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public UserNotificationRepository(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public void AddUserNotification(NotificationDto notification, int userId)
        {
            var entries = _context.UserNotifications
                .Where(n => n.Endpoint == notification.Endpoint)
                .Where(n => n.UserId == userId)
                .ToList();

            if(entries.Count > 0)
            {
                /*it should be just one*/
                var entry = entries.FirstOrDefault();
                entry.Auth = notification.Auth;
                entry.P256dh = notification.P256dh;
            }
            /*Client can have different endpoint. In this Case i should create new Entry*/
            else
            {
                var n = new UserNotification
                {
                    UserId = userId,
                    Auth = notification.Auth,
                    Endpoint = notification.Endpoint,
                    P256dh = notification.P256dh
                };

                _context.UserNotifications.Add(n);
            }
        }

        public async Task<UserNotification> GetUserNotification(int userId)
        {
            return await _context.UserNotifications.SingleOrDefaultAsync(e => e.UserId == userId);
        }

        public void SendNotificationToAll(string title, string content)
        {   
            var vapidDetails = new VapidDetails("mailto:", _configuration["Vapid:publicKey"], _configuration["Vapid:privateKey"]);

            JObject payloadNotification =
                new JObject(
                    new JProperty("notification",
                        new JObject(
                            new JProperty("title", title),
                            new JProperty("body", content),
                            new JProperty("vibrate", new JArray(100, 50, 100)),
                            new JProperty("data", new JObject(new JProperty("dateOfArrival", DateTime.Now)))
                            )
                        )
                    );

            var notificationList = _context.UserNotifications.ToList();

            notificationList.ForEach(
                n =>
                {
                    var user = _context.Users.Find(n.UserId);
                    if (user.SendNotification)
                    {
                        var subscription = new PushSubscription(n.Endpoint, n.P256dh, n.Auth);
                        var webPushClient = new WebPushClient();
                        try
                        {
                            webPushClient.SendNotification(subscription, payloadNotification.ToString(), vapidDetails);
                        }
                        catch (Exception e)
                        {
                        }
                    }
                });

        }

        public async Task SendNotificationToUser(string title, string content,int userId)
        {
            var subject = "mailto:";
            var publicKey = _configuration["Vapid:publicKey"];
            var privateKey = _configuration["Vapid:privateKey"];

            var vapidDetails = new VapidDetails(subject, publicKey, privateKey);

            JObject payloadNotification =
                new JObject(
                    new JProperty("notification",
                        new JObject(
                            new JProperty("title", title),
                            new JProperty("body", content),
                            new JProperty("vibrate", new JArray(100, 50, 100)),
                            new JProperty("data", new JObject(new JProperty("dateOfArrival", DateTime.Now)))
                            )
                        )
                    );

            await _context.UserNotifications.Where(n => n.UserId == userId).ForEachAsync(
                n =>
                {
                    var subscription = new PushSubscription(n.Endpoint, n.P256dh, n.Auth);

                    var webPushClient = new WebPushClient();
                    try
                    {
                        webPushClient.SendNotification(subscription, payloadNotification.ToString(), vapidDetails);
                    }
                    catch (Exception e)
                    {
                    }
                }
            );
        }
    }
}
