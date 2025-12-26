# คำสั่งสำหรับอัพโหลดขึ้น GitHub

## ✅ สถานะปัจจุบัน

โปรเจกต์นี้ถูก push ขึ้น GitHub แล้ว:

- **Repository:** [https://github.com/bowbozaa/create-skills](https://github.com/bowbozaa/create-skills)
- **Branch:** `main`
- **Remote:** `origin` → [https://github.com/bowbozaa/create-skills.git](https://github.com/bowbozaa/create-skills.git)

## ขั้นตอนการอัพโหลด (สำหรับโปรเจกต์ใหม่)

### 1. สร้าง Repository บน GitHub

1. ไปที่ [https://github.com/new](https://github.com/new)
2. ตั้งชื่อ repository: `create-skills`
3. เลือก Public หรือ Private
4. **อย่า** check "Initialize this repository with a README" (เพราะเรามีไฟล์อยู่แล้ว)
5. คลิก "Create repository"

### 2. เพิ่ม Remote และ Push

หลังจากสร้าง repository แล้ว ให้รันคำสั่งต่อไปนี้:

```bash
cd create-skills

# เพิ่ม remote (แทนที่ YOUR_USERNAME ด้วย GitHub username ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/create-skills.git

# เปลี่ยนชื่อ branch เป็น main (ถ้ายังใช้ master)
git branch -M main

# Push ขึ้น GitHub
git push -u origin main
```

**หมายเหตุ:** ถ้า remote มีอยู่แล้วและต้องการเปลี่ยน URL:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/create-skills.git
```

### 3. ตรวจสอบ

ไปที่ `https://github.com/YOUR_USERNAME/create-skills` เพื่อดู repository

## คำสั่งแบบย่อ (Copy-Paste)

```bash
cd create-skills
git remote add origin https://github.com/YOUR_USERNAME/create-skills.git
git branch -M main
git push -u origin main
```

**หมายเหตุ:** แทนที่ `YOUR_USERNAME` ด้วย GitHub username ของคุณ

## การอัพเดต Repository

หลังจากแก้ไขไฟล์แล้ว ให้ใช้คำสั่งต่อไปนี้:

```bash
cd create-skills
git add .
git commit -m "Your commit message"
git push origin main
```
