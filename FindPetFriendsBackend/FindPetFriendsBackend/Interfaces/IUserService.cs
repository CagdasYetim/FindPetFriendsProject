﻿using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserService
    {
        public Task SaveProfileSetting(AppUser user , SettingDto setting);
    }
}
