package com.example.demo.mediator;

import com.example.demo.model.*;
import com.example.demo.services.FamilyService;
import com.example.demo.services.MemberService;
import com.example.demo.translator.TranslatorFamilyDBtoFamilyDTO;
import com.example.demo.translator.TranslatorFamilyDTOtoFamilyDB;
import com.example.demo.translator.TranslatorMemberDBToMemberDTO;
import com.example.demo.translator.TranslatorMemberDTOtoMemberDB;
import org.springframework.stereotype.Component;

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
}
