using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEventRepository
    {
        public Task<IEnumerable<Event>> GetAllEvents();
        public Task<IEnumerable<Event>> GetAllEventsWithFilter(EventFilterDto filter);
    }
}
