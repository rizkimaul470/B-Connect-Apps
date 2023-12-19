package com.dicoding.b_connect.di

import android.content.Context
import com.dicoding.b_connect.pref.UserPreference
import com.dicoding.b_connect.pref.UserRepository
import com.dicoding.b_connect.pref.dataStore

object Injection {
    fun provideRepository(context: Context): UserRepository {
        val pref = UserPreference.getInstance(context.dataStore)
        return UserRepository.getInstance(pref)
    }
}