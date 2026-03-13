<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LegalPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_privacy_policy_page_is_accessible_to_guests(): void
    {
        $response = $this->get(route('legal.privacy'));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Legal/Privacy'));
    }

    public function test_terms_of_service_page_is_accessible_to_guests(): void
    {
        $response = $this->get(route('legal.terms'));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Legal/Terms'));
    }
}

