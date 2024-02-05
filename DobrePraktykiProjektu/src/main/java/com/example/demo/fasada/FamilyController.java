package com.example.demo.fasada;

import com.example.demo.mediator.Mediator;
import com.example.demo.model.FamilyDTO;
import com.example.demo.model.FamilyExtendedDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FamilyController {
    Mediator mediator;

    public FamilyController(Mediator mediator) {
        this.mediator = mediator;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/save")
    public void saveFamily(@RequestBody FamilyDTO familyDTO) {
        mediator.saveFamily(familyDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "getbyname")
    public List<FamilyExtendedDTO> getFamilyByParam(@RequestParam String name) {
        return mediator.getByName(name);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getall")
    public List<FamilyExtendedDTO> getAllFamily() {
        return mediator.getAll();
    }
}
