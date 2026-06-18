"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "login" | "register";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("123456");
  const [loginError, setLoginError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [regUser, setRegUser] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("qiyuan_users") || "[]");
    const validUser = users.find((u: { username: string; password: string }) =>
      u.username === loginUser && u.password === loginPass
    );
    if (loginUser === "admin" && loginPass === "123456" || validUser) {
      setLoggedIn(true);
      setLoginError(false);
      localStorage.setItem("qiyuan_logged_in", "true");
      localStorage.setItem("qiyuan_user", loginUser);
    } else {
      setLoginError(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regUser || !regEmail || !regPass) { setRegError("请填写所有必填字段"); return; }
    if (regPass !== regConfirm) { setRegError("两次密码输入不一致"); return; }
    if (regPass.length < 6) { setRegError("密码长度至少 6 位"); return; }
    const users = JSON.parse(localStorage.getItem("qiyuan_users") || "[]");
    if (users.find((u: { username: string }) => u.username === regUser)) { setRegError("用户名已存在"); return; }
    users.push({ username: regUser, email: regEmail, password: regPass });
    localStorage.setItem("qiyuan_users", JSON.stringify(users));
    setRegSuccess(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("qiyuan_logged_in");
    localStorage.removeItem("qiyuan_user");
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">登录成功</h1>
          <p className="text-gray-400 mb-2">欢迎回来，{localStorage.getItem("qiyuan_user") || "用户"}</p>
          <p className="text-gray-500 text-sm mb-8">当前权限级别：成员</p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 rounded-lg bg-brand-gold/20 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/30 transition-colors">
              进入首页
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
              退出登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-gold mb-2">启元智能</h1>
          <p className="text-gray-500 text-sm">QIYUAN INTELLIGENCE</p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
          <div className="flex mb-8 border-b border-white/10">
            <button
              onClick={() => { setTab("login"); setLoginError(false); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${tab === "login" ? "text-brand-gold border-b-2 border-brand-gold" : "text-gray-500 hover:text-gray-300"}`}>
              登录
            </button>
            <button
              onClick={() => { setTab("register"); setRegError(""); setRegSuccess(false); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${tab === "register" ? "text-brand-gold border-b-2 border-brand-gold" : "text-gray-500 hover:text-gray-300"}`}>
              注册
            </button>
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">用户名</label>
                <input type="text" value={loginUser} onChange={(e) => { setLoginUser(e.target.value); setLoginError(false); }}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="admin" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">密码</label>
                <input type="password" value={loginPass} onChange={(e) => { setLoginPass(e.target.value); setLoginError(false); }}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="123456" />
              </div>
              {loginError && <p className="text-red-400 text-sm">用户名或密码错误</p>}
              <button type="submit" className="w-full px-4 py-3 rounded-lg bg-brand-gold/20 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/30 transition-colors font-medium">
                登录
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {regSuccess ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"><span className="text-xl">✓</span></div>
                  <p className="text-green-400 font-medium mb-2">注册成功</p>
                  <p className="text-gray-400 text-sm mb-4">用户 {regUser} 已创建</p>
                  <button type="button"
                    onClick={() => { setTab("login"); setRegSuccess(false); setRegUser(""); setRegEmail(""); setRegPass(""); setRegConfirm(""); }}
                    className="text-brand-gold hover:text-brand-gold/80 text-sm">前往登录 →</button>
                </div>
              ) : (
                <>
                  <div><label className="text-xs text-gray-400 mb-1 block">用户名 *</label>
                    <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="输入用户名" /></div>
                  <div><label className="text-xs text-gray-400 mb-1 block">邮箱 *</label>
                    <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="example@qiyuan.beauty" /></div>
                  <div><label className="text-xs text-gray-400 mb-1 block">密码 *</label>
                    <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="至少6位" /></div>
                  <div><label className="text-xs text-gray-400 mb-1 block">确认密码 *</label>
                    <input type="password" value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="再次输入密码" /></div>
                  {regError && <p className="text-red-400 text-sm">{regError}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setTab("login")} className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">取消</button>
                    <button type="submit" className="flex-1 px-4 py-3 rounded-lg bg-brand-gold/20 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/30 transition-colors font-medium">提交注册</button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}