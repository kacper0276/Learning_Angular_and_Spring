package com.example.demo.mediator;

import com.example.demo.model.FamilyDB;
import com.example.demo.model.FamilyDTO;
import com.example.demo.model.FamilyExtendedDTO;
import com.example.demo.services.FamilyService;
import com.example.demo.translator.TranslatorFamilyDBtoFamilyDTO;
import com.example.demo.translator.TranslatorMemberDBToMemberDTO;
import org.springframework.stereotype.Component;

@Component
public class Mediator{
    TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO;
    TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO;
    FamilyService familyService;

    public Mediator(TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO, TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO, FamilyService familyService) {
        this.translatorMemberDBToMemberDTO = translatorMemberDBToMemberDTO;
        this.translatorFamilyDBtoFamilyDTO = translatorFamilyDBtoFamilyDTO;
        this.familyService = familyService;
    }

    public void saveFamily(FamilyDTO familyDTO) {
        FamilyDB familyDB = new FamilyDB();
        familyService.save(familyDB);
    }

    public void updateFamily(FamilyExtendedDTO familyExtendedDTO) {
        FamilyDB familyDB = new FamilyDB();
        familyService.save(familyDB);
    }
}
