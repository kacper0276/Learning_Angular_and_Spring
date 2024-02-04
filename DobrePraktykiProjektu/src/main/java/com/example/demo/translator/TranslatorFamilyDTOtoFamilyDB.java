package com.example.demo.translator;

import com.example.demo.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class TranslatorFamilyDTOtoFamilyDB {

    public FamilyDB toFamilyDB(FamilyExtendedDTO familyExtendedDTO) {
        FamilyDB familyDB = toFamilyDBMap(familyExtendedDTO);
        familyDB.getHead().setFamilyId(familyDB);

        return familyDB;
    }

    public FamilyDB ToFamilyDB(FamilyDTO familyDTO) {
        FamilyDB familyDB = toFamilyDBMap(familyDTO);
        return familyDB;
    }

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "origin", source = "origin")
    })
    protected abstract FamilyDB toFamilyDBMap(FamilyDTO familyDTO);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "origin", source = "origin"),
            @Mapping(expression = "java(toFamilyDBMap(familyExtendedDTO.getHead()))", target = "head")
    })
    protected abstract FamilyDB toFamilyDBMap(FamilyExtendedDTO familyExtendedDTO);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "age", source = "age"),
            @Mapping(target = "gender", source = "gender"),
            @Mapping(target = "familyId", ignore = true)
    })
    protected abstract MembersDB toFamilyDBMap(MembersDTO membersDTO );
}
