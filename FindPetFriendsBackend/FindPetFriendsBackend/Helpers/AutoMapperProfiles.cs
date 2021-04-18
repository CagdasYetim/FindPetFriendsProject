using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

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
                .ForMember(dest => dest.EventOwner, opt => opt.MapFrom(src => src.AppUser.UserName));
        }
    }
}