package com.example.demo.mediator;

import com.example.demo.model.*;
import com.example.demo.services.FamilyService;
import com.example.demo.services.MemberService;
import com.example.demo.translator.TranslatorFamilyDBtoFamilyDTO;
import com.example.demo.translator.TranslatorFamilyDTOtoFamilyDB;
import com.example.demo.translator.TranslatorMemberDBToMemberDTO;
import com.example.demo.translator.TranslatorMemberDTOtoMemberDB;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Mediator{
    TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO;
    TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO;
    TranslatorFamilyDTOtoFamilyDB translatorFamilyDTOtoFamilyDB;
    TranslatorMemberDTOtoMemberDB translatorMemberDTOtoMemberDB;
    FamilyService familyService;
    MemberService memberService;

    public Mediator(TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO, TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO, FamilyService familyService, TranslatorFamilyDTOtoFamilyDB translatorFamilyDTOtoFamilyDB, MemberService memberService, TranslatorMemberDTOtoMemberDB translatorMemberDTOtoMemberDB) {
        this.translatorMemberDBToMemberDTO = translatorMemberDBToMemberDTO;
        this.translatorFamilyDBtoFamilyDTO = translatorFamilyDBtoFamilyDTO;
        this.translatorFamilyDTOtoFamilyDB = translatorFamilyDTOtoFamilyDB;
        this.translatorMemberDTOtoMemberDB = translatorMemberDTOtoMemberDB;
        this.familyService = familyService;
        this.memberService = memberService;
    }

    public void saveFamily(FamilyDTO familyDTO) {
        FamilyDB familyDB = translatorFamilyDTOtoFamilyDB.ToFamilyDB(familyDTO);
        familyService.save(familyDB);
    }

    public void updateFamily(FamilyExtendedDTO familyExtendedDTO) {
        FamilyDB familyDB = translatorFamilyDTOtoFamilyDB.toFamilyDB(familyExtendedDTO);
        familyService.save(familyDB);
    }

    public void saveMember(MembersDTO membersDTO) {
        MembersDB membersDB = translatorMemberDTOtoMemberDB.toMemberDB(membersDTO);
        memberService.save(membersDB);
    }

    public void updateMember(MembersExtendedDTO MembersExtendedDTO) {
        MembersDB membersDB = translatorMemberDTOtoMemberDB.toMemberDB(MembersExtendedDTO);
        memberService.save(membersDB);
    }

    public List<FamilyExtendedDTO> getByName(String name) {
        List<FamilyDB> familyDBS = familyService.findByName(name);
        List<FamilyExtendedDTO> list = new ArrayList<>();
        for(var family: familyDBS) {
            list.add(translatorFamilyDBtoFamilyDTO.TofamilyExtendedDTO(family));
        }
        return list;
    }

    public List<FamilyExtendedDTO> getAll() {
        List<FamilyDB> familyDBS = familyService.getAll();
        List<FamilyExtendedDTO> list = new ArrayList<>();
        for(var family: familyDBS) {
            list.add(translatorFamilyDBtoFamilyDTO.TofamilyExtendedDTO(family));
        }
        return list;
    }

    public List<MembersExtendedDTO> getAllMembers() {
        List<MembersDB> list = memberService.getAll();
        List<MembersExtendedDTO> list1 = new ArrayList<>();
        for(var membersDB: list) {
            list1.add(translatorMemberDBToMemberDTO.toMemberExtendedDTO(membersDB));
        }
        return list1;
    }
}
