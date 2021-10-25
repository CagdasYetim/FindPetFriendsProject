using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPush;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        public UserController(IUnitOfWork unitOfWork,
                              IMapper mapper,
                              IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("save-profile-settings")]
        public async Task<ActionResult<SettingDto>> SaveProfileSettings(SettingDto settingDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null)
            {
                return BadRequest("User is null");
            }
            
            await _userService.SaveProfileSetting(user, settingDto);
            
            if(await _unitOfWork.Complete())
            {
                return Ok(
                        new SettingDto {
                            ShowName = user.ShowName,
                            ShowLastLocation = user.ShowLastLocation,
                            SendNotification = user.SendNotification,
                            City = user.City,
                            IHave = (from ihave in user.IHaves select ihave.Value).ToList(),
                            CanJoin = (from canJoin in user.CanJoins select canJoin.Value).ToList()
                        }
                    ); ;
            }
            return BadRequest();
        }

        [HttpGet("getProfile")]
        public async Task<ActionResult<SettingDto>> getProfile()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user!=null)
            {
                return new SettingDto
                {
                    ShowName = user.ShowName,
                    ShowLastLocation = user.ShowLastLocation,
                    SendNotification = user.SendNotification,
                    City = user.City,
                    IHave = (from ihave in user.IHaves select ihave.Value).ToList(),
                    CanJoin = (from canJoin in user.CanJoins select canJoin.Value).ToList()
                };
            }
            return BadRequest();
        }

        [HttpPost("create-event")]
        public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsyncWithEvent(User.GetUsername());

            if(user == null)
            {
                return BadRequest("user is null");
            }

            var currEvent = _mapper.Map<Event>(eventDto);

            currEvent.AppUser = user;
            currEvent.AppUserId = user.Id;
            currEvent.CanJoins = user.CanJoins.Select(e => new EventCanJoin { Value = e.Value }).ToList();
            currEvent.IHaves = user.IHaves.Select(e => new EventIHave { Value = e.Value }).ToList();
            currEvent.City = user.City;

            user.Events.Add(currEvent);

            if(await _unitOfWork.Complete())
            {
                return Ok(_mapper.Map<EventDto>(currEvent));
            }

            return BadRequest(eventDto);
        }
        [HttpGet("my-events")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetMyEvents()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsyncWithEvent(User.GetUsername());
            if (user == null)
                return BadRequest();

            var events = await _unitOfWork.EventRepository.GetAllMyEvents(user.Id);

            if(events == null)
            {
                return BadRequest();
            }

            return Ok(events.Select(e => _mapper.Map<EventDto>(e)).ToList());
        }

        [HttpDelete("delete-event/{id}")]
        public async Task<ActionResult<int>> DeleteEvent(int id)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsyncWithEvent(User.GetUsername());
            if (user == null)
            {
                return BadRequest();
            }
            
            var events = user.Events
                             .Where(e => e.Id == id)
                             .ToList();
            if(events.Count > 1)
            {
                return BadRequest("Id should be uniq");
            }

            var eventToDelete = events.FirstOrDefault();

            if(eventToDelete == null)
            {
                return BadRequest("there is no such a event");
            }

            user.Events.Remove(eventToDelete);
            
            if (await _unitOfWork.Complete())
            {
                return Ok(id);
            }

            return Ok(id);
        }

        [HttpPost("save-notification")]
        public async Task<ActionResult> saveNotificationFromUser(NotificationDto notificationDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user == null)
            {
                return BadRequest();
            }
            var userId = user.Id;

            _unitOfWork.UserNotificationRepository.AddUserNotification(notificationDto, userId);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet("newsletter")]
        public ActionResult sendNewsletter()
        {
            _unitOfWork.UserNotificationRepository.SendNotificationToAll("newsletter","you got newsletter notification");
            return Ok();
        }

    }
}
