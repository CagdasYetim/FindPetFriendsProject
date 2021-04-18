using API.Controllers;
using API.DTOs;
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
            var events = await _unitOfWork.EventRepository.GetAllEventsWithFilter(filter);
            var eventDtos = events.Select(e => _mapper.Map<EventDto>(e));
            return Ok(eventDtos);
        }
    }
}
