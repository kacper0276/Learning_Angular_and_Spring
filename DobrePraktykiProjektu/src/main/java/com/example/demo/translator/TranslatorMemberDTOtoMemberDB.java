package com.example.demo.translator;

import com.example.demo.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class TranslatorMemberDTOtoMemberDB {

    public MembersDB toMemberDB (MembersDTO membersDTO) {
        MembersDB membersDB = toMemberDBMap(membersDTO);
        return membersDB;
    }

    public MembersDB toMemberDB (MembersExtendedDTO membersExtendedDTO) {
        MembersDB membersDB = toMemberDBMap(membersExtendedDTO);
        membersDB.getFamilyId().setHead(membersDB);
        return membersDB;
    }


    @Mappings({
        @Mapping(target = "id", ignore = true),
        @Mapping(target = "name", source = "name"),
        @Mapping(target = "age", source = "age"),
        @Mapping(target = "gender", source = "gender"),
        @Mapping(target = "familyId", ignore = true)
    })
    protected abstract MembersDB toMemberDBMap(MembersDTO membersDTO);

    @Mappings({
         @Mapping(target = "id", ignore = true),
         @Mapping(target = "name", source = "name"),
         @Mapping(target = "age", source = "age"),
         @Mapping(target = "gender", source = "gender"),
         @Mapping(target = "familyId", expression = "java(toFamilyDTOMap(membersExtendedDTO.getFamily()))")
    })
    protected abstract MembersDB toMemberDBMap(MembersExtendedDTO membersExtendedDTO);

    @Mappings({
         @Mapping(target = "id", ignore = true),
         @Mapping(target = "name", source = "name"),
         @Mapping(target = "origin", source = "origin"),
         @Mapping(target = "head", ignore = true)
    })
    protected abstract FamilyDB toFamilyDTOMap(FamilyDTO familyDTO);
}
