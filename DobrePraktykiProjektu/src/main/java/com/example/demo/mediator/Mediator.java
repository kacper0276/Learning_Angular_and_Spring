package com.example.demo.mediator;

import com.example.demo.translator.TranslatorFamilyDBtoFamilyDTO;
import com.example.demo.translator.TranslatorMemberDBToMemberDTO;
import org.springframework.stereotype.Component;

@Component
public class Mediator{
    TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO;
    TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO;

    public Mediator(TranslatorMemberDBToMemberDTO translatorMemberDBToMemberDTO, TranslatorFamilyDBtoFamilyDTO translatorFamilyDBtoFamilyDTO) {
        this.translatorMemberDBToMemberDTO = translatorMemberDBToMemberDTO;
        this.translatorFamilyDBtoFamilyDTO = translatorFamilyDBtoFamilyDTO;
    }
}
