package com.example.demo.mediator;

import com.example.demo.model.FamilyDB;
import com.example.demo.model.FamilyDTO;
import com.example.demo.model.FamilyExtendedDTO;
import com.example.demo.model.MembersDTO;
import com.example.demo.services.FamilyService;
import com.example.demo.services.MemberService;
import com.example.demo.translator.TranslatorFamilyDBtoFamilyDTO;
import com.example.demo.translator.TranslatorFamilyDTOtoFamilyDB;
import com.example.demo.translator.TranslatorMemberDBToMemberDTO;
import org.springframework.stereotype.Component;

@Component
public class Mediator{
    TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO;
    TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO;
    TranslatorFamilyDTOtoFamilyDB translatorFamilyDTOtoFamilyDB;
    FamilyService familyService;
    MemberService memberService;

    public Mediator(TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO, TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO, FamilyService familyService, TranslatorFamilyDTOtoFamilyDB translatorFamilyDTOtoFamilyDB, MemberService memberService) {
        this.translatorMemberDBToMemberDTO = translatorMemberDBToMemberDTO;
        this.translatorFamilyDBtoFamilyDTO = translatorFamilyDBtoFamilyDTO;
        this.translatorFamilyDTOtoFamilyDB = translatorFamilyDTOtoFamilyDB;
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

        memberService.save(null);
    }

    public void updateMember(MembersDTO membersDTO) {
        memberService.save(null);
    }
}
