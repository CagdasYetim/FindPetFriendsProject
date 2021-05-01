using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            _ = CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            _ = CreateMap<RegisterDto, AppUser>();
            _ = CreateMap<EventDto, Event>();
            _ = CreateMap<Event, EventDto>()
                .ForMember(dest => dest.CanJoinsList, opt => opt.MapFrom(src => src.CanJoins.Select(c => c.Value).ToList()))
                .ForMember(dest => dest.IHavesList, opt => opt.MapFrom(src => src.IHaves.Select(i => i.Value).ToList()));
        }
    }
}