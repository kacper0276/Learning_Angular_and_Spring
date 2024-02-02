package com.example.demo;

import org.mapstruct.Mapper;

@Mapper
public abstract class FamilyMapper {
    public abstract Family FamilyDbToFamily(FamilyDB familyDB);
}
