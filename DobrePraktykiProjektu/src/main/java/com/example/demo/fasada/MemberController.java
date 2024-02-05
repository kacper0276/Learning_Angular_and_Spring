package com.example.demo.fasada;

import com.example.demo.mediator.Mediator;
import com.example.demo.model.MembersDTO;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {
    Mediator mediator;

    public MemberController(Mediator mediator) {
        this.mediator = mediator;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/saveMember")
    public void save(@RequestBody MembersDTO membersDTO, @RequestParam long id) {
        mediator.saveMember(membersDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getallmembers")
    public void getAll() {
        mediator.getAllMembers();
    }
}
