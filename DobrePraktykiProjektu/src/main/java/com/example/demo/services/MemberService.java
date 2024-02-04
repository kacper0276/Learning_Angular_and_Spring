package com.example.demo.services;

import com.example.demo.model.FamilyDB;
import com.example.demo.model.MembersDB;
import com.example.demo.model.MembersDTO;
import com.example.demo.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void save(MembersDB membersDB) {
        memberRepository.save(membersDB);
    }

    public List<MembersDB> getMemberDBByName(String name) {
        return (List<MembersDB>) memberRepository.findByName(name);
    }
}
