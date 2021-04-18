using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EventRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _context.Events
                                 .Include(u => u.AppUser)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetAllEventsWithFilter(EventFilterDto filter)
        {
            var filteredEvents = _context.Events.Include(u => u.AppUser).AsQueryable();

            ExpressionStarter<Event>[] exps = { null, null, null, null };

            if(filter.NameOfEvent != null)
            {
                exps[0] = PredicateBuilder.New<Event>(e => e.NameOfEvent == filter.NameOfEvent);
            }

            if(filter.InCities != null)
            {
                exps[1] = PredicateBuilder.New<Event>();
                foreach (var c in filter.InCities)
                {
                    exps[1] = exps[1].Or(e => e.City == c);
                }
            }

            exps[2] = PredicateBuilder.New<Event>(e => DateTime.Compare(e.StartDate,filter.DateOfEvent) >= 0);

            if(filter.WithBreeds != null)
            {
                exps[3] = PredicateBuilder.New<Event>();
                foreach(var b in filter.WithBreeds)
                {
                    exps[3] = exps[3].Or(e => e.AppUser.IHaves.Select(i => i.Value).ToList().Contains(b) );
                }
            }

            var sumPredicates = PredicateBuilder.New<Event>();

            int index;
            for(index = 0; index <4; index++)
            {
                if(exps[index] != null)
                {
                    sumPredicates = sumPredicates.And(exps[index]);
                }
            }

            var sendList = await filteredEvents.Where(sumPredicates).ToListAsync();

            return sendList;
        }
    }
}
