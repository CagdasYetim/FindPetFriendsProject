using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync("cagdastest"/*User.GetUsername()*/);
            await _userService.SaveProfileSetting(user, settingDto);
            
            if(await _unitOfWork.Complete())
            {
                return Ok(
                        new SettingDto{
                            ShowName = user.ShowName,
                            ShowLastLocation = user.ShowLastLocation,
                            SendNotification = user.SendNotification,
                            IHave = (from ihave in user.IHaves select ihave.Value).ToList(),
                            CanJoin = (from canJoin in user.CanJoins select canJoin.Value).ToList()
                        }
                    );
            }
            return BadRequest();
        }
        [HttpPost("create-event")]
        public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsyncWithEvent("cagdastest"/*User.GetUsername()*/);
            var currEvent = _mapper.Map<Event>(eventDto);

            currEvent.AppUser = user;
            currEvent.AppUserId = user.Id;

            user.Events.Add(currEvent);

            if(await _unitOfWork.Complete())
            {
                return Ok(eventDto);
            }

            return BadRequest(eventDto);
        }
        [HttpGet("my-events")]
        public async Task<ActionResult<IEnumerable<EventDto>>> getMyEvents()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsyncWithEvent("cagdastest"/*User.GetUsername()*/);
            var events = user.Events
                             .Select(e => _mapper.Map<EventDto>(e));
            return Ok(events);
        }

    }
}
