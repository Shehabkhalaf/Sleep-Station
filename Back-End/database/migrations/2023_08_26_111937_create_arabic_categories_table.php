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
        Schema::create('arabic_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->unique()->onUpdate('cascade')->onDelete('cascade');
            $table->string('title')->unique();
            $table->enum('status', ['active', 'not active'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arabic_categories');
    }
};