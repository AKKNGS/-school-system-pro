"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import AppShell from "@/components/AppShell"
import PageHeader from "@/components/PageHeader"
import { StatCard } from "@/components/StatsCards"

export default function DashboardPage() {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [payments, setPayments] = useState([])

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const [
      { data: studentsData },
      { data: teachersData },
      { data: paymentsData }
    ] = await Promise.all([
      supabase.from("students").select("*").order("created_at", { ascending: false }),
      supabase.from("teachers").select("*").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("created_at", { ascending: false })
    ])

    if (studentsData) setStudents(studentsData)
    if (teachersData) setTeachers(teachersData)
    if (paymentsData) setPayments(paymentsData)
  }

  const stats = useMemo(() => {
    const totalStudents = students.length
    const femaleStudents = students.filter(s => String(s.gender).toLowerCase() === "female").length
    const maleStudents = students.filter(s => String(s.gender).toLowerCase() === "male").length
    const totalTeachers = teachers.length
    const totalAmount = payments.reduce((sum, p) => sum + Number(p.total_amount || 0), 0)
    const teacherAmount = payments.reduce((sum, p) => sum + Number(p.teacher_share || 0), 0)
    const schoolAmount = payments.reduce((sum, p) => sum + Number(p.school_share || 0), 0)

    return { totalStudents, femaleStudents, maleStudents, totalTeachers, totalAmount, teacherAmount, schoolAmount }
  }, [students, teachers, payments])

  return (
    <AppShell>
      <PageHeader
        kicker="Student Management"
        title="ប្រព័ន្ធគ្រប់គ្រងសាលា System Pro"
        subtitle="គ្រប់គ្រងសិស្ស គ្រូ ការបង់ប្រាក់ និងរបាយការណ៍ បានយ៉ាងស្អាត និងងាយស្រួល"
        actions={
          <>
            <a href="/students" className="btn btn-outline">👨‍🎓 Students</a>
            <a href="/teachers" className="btn btn-soft">👩‍🏫 Teachers</a>
            <a href="/payments" className="btn btn-soft">💳 Payments</a>
          </>
        }
      />

      <section className="hero-card">
        <div>
          <div className="hero-badge">🛡️ Professional School Management</div>
          <h2 className="hero-title">Dashboard សាលា ទំនើប និងមានការគ្រប់គ្រងប្រាក់សិក្សា</h2>
          <p className="hero-text">មើលស្ថិតិសិស្ស គ្រូ និងចំណូលសរុបជាប្រព័ន្ធតែមួយ។</p>
        </div>
        <div className="role-box">
          <small>Role</small>
          <strong>Admin</strong>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard className="stat-blue" title="គ្រូសរុប" value={stats.totalTeachers} />
        <StatCard className="stat-purple" title="សិស្សស្រី" value={stats.femaleStudents} />
        <StatCard className="stat-green" title="សិស្សសរុប" value={stats.totalStudents} />
        <StatCard className="stat-orange" title="សិស្សប្រុស" value={stats.maleStudents} />
      </section>

      <section className="stats-grid large">
        <StatCard className="stat-dark" title="ទឹកប្រាក់សរុប" value={stats.totalAmount.toLocaleString("en-US") + " ៛"} />
        <StatCard className="stat-violet" title="ចំណែកគ្រូ (80%)" value={stats.teacherAmount.toLocaleString("en-US") + " ៛"} />
        <StatCard className="stat-teal" title="ចំណែកសាលា (20%)" value={stats.schoolAmount.toLocaleString("en-US") + " ៛"} />
      </section>
    </AppShell>
  )
}
