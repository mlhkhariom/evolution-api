<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('aiChatbotEnabled')->default(false);
            $table->string('aiApiKey')->nullable();
            $table->text('aiPrompt')->nullable();
            $table->string('licenseStatus')->default('inactive');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['aiChatbotEnabled', 'aiApiKey', 'aiPrompt', 'licenseStatus']);
        });
    }
};
