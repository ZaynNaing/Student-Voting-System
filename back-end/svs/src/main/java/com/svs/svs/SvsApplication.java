package com.svs.svs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.svs.svs.entity.Policy;
import com.svs.svs.repository.PolicyRepository;
import com.svs.svs.repository.UserRepository;
import com.svs.svs.repository.VoteRepository;
import com.svs.svs.service.PolicyService;

@SpringBootApplication
public class SvsApplication implements CommandLineRunner {

	@Autowired
	private PolicyRepository policyRepository;

	@Autowired
	private PolicyService policyService;

	public static void main(String[] args) {
		SpringApplication.run(SvsApplication.class, args);
	}

	public void run(String[] args) {

		Policy p1 = new Policy("International Study Programs",
				"The University of Northern Iowa encourages student, faculty, and staff participation in University and Regent sponsored international activities.  The Study Abroad Center (SAC) is the campus unit responsible for oversight of all international study programs involving students, faculty, and/or staff traveling abroad, whether for credit or not for credit and regardless of program duration.  SAC helps ensure that student, faculty, and staff transportation, housing and other logistical arrangements for study abroad activities meet personal safety standards, international travel regulations and are accurately reported and accounted for according to University policies governing financial transactions.  The SAC works with faculty directors and other units involved in program delivery to develop a program budget which supports and maintains the financial viability of the international study program.  In the case of degree programs offered abroad, SAC coordinates program services with the Office of Continuing and Distance Education.",
				"john.doe@example.com", "2024-11-11", "Library", 15);
		policyService.save(p1);


		policyService.fetchAllPolicy();


		policyService.fetchPolicyByOwner("john.doe@example.com");

	}

}
