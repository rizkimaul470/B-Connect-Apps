package com.dicoding.b_connect.pref

data class UserModel (
    val email: String,
    val token: String,
    val isLogin: Boolean = false
)