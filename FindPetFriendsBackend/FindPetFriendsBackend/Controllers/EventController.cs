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

namespace FindPetFriendsBackend.Controllers
{
    public class EventController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public EventController(IUnitOfWork unitOfWork,
                              IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
        {
            var events = await _unitOfWork.EventRepository.GetAllEvents();
            var eventDtos = events.Select(e => _mapper.Map<EventDto>(e));

            return Ok(eventDtos);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetFilteredEvents(EventFilterDto filter)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            if(user == null)
            {
                return BadRequest();
            }

            var events = await _unitOfWork.EventRepository.GetAllEventsWithFilter(filter);
            var eventDtos = events.Where(u => u.AppUserId != user.Id).Select(e => _mapper.Map<EventDto>(e));
            return Ok(eventDtos);
        }

        [HttpPost("i-come")]
        public async Task<ActionResult> SetToComeToEvent(ToComeDto toCome)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var e = await _unitOfWork.EventRepository.GetEventById(toCome.EventId);

            if(e.ToComes.Where(t => t.Value == user.Id).ToList().Count > 0)
            {
                return BadRequest();
            }

            e.ToComes.Add(new EventToCome { Value = user.Id });

            if (await _unitOfWork.Complete())
            {
                Ok();
            }

            return BadRequest();
        }
        
    }
}
