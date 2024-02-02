package com.example.demo;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class FamilyMapper {
    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "uid", source = "id"),
    })
    public abstract Family FamilyDbToFamily(FamilyDB familyDB);
}
