# 🎨 GSAP & Framer Motion Animation Guide

## 🚀 Advanced Animations Implementation

Selamat! Portfolio Anda sekarang telah dilengkapi dengan animasi GSAP yang canggih seperti referensi yang Anda berikan. Berikut adalah fitur-fitur yang telah diimplementasikan:

## ✨ Fitur Animasi Baru

### 1. **GSAP Floating Elements** (`GSAPFloatingElement`)
Berdasarkan referensi floating can animation, dengan 4 tipe animasi:

#### **Gentle Animation** (seperti referensi Anda)
```javascript
// Mirip dengan animasi can Anda tapi lebih smooth
- Gerakan naik-turun dengan rotasi halus
- Durasi dan easing yang bervariasi  
- Loop infinite dengan transisi smooth
```

#### **Dynamic Animation**
```javascript
- Gerakan lebih dinamis dengan scaling
- Elastic dan back easing effects
- Kombinasi translate, rotate, dan scale
```

#### **Complex Animation**
```javascript
- Motion path animation (gerakan mengikuti path)
- Auto-rotate mengikuti arah gerakan
```

#### **Orbit Animation**  
```javascript
- Gerakan orbital memutar
- Transform origin yang dapat disesuaikan
```

### 2. **Advanced Background Elements**
- 12+ floating objects dengan animasi berbeda
- Shapes: circle, square, triangle, star
- Sizes: sm, md, lg, xl
- Colors: blue, purple, pink, green, orange
- Random positioning system

### 3. **ScrollTrigger Animations**
Animasi yang trigger saat scroll:
- `slideUp` - Slide dari bawah
- `slideLeft` - Slide dari kiri  
- `slideRight` - Slide dari kanan
- `scale` - Scale animation
- `rotate` - Rotate animation
- `wave` - Staggered children animation

### 4. **Advanced Text Animations** 
- **Typewriter Effect** - Text muncul per karakter
- **Wave Effect** - Text muncul dengan stagger wave
- **Glow Effect** - Text dengan efek glow shadow

## 🛠️ Cara Menggunakan

### 1. **Membuat Floating Element Sederhana**
```tsx
import { GSAPFloatingElement } from "@/components/ui/gsap-floating"

<GSAPFloatingElement animationType="gentle">
  <div className="floating-object">Your Content</div>
</GSAPFloatingElement>
```

### 2. **Menggunakan FloatingShape**
```tsx
import { FloatingShape } from "@/components/ui/gsap-floating"

<FloatingShape 
  shape="circle"     // circle, square, triangle, star
  size="lg"         // sm, md, lg, xl  
  color="blue"      // blue, purple, pink, green, orange
  animationType="dynamic" // gentle, dynamic, complex, orbit
  className="absolute top-20 left-10"
/>
```

### 3. **Scroll-triggered Animations**
```tsx
import { AnimatedSection } from "@/components/ui/gsap-animations"

<AnimatedSection animationType="slideUp">
  <div>This will animate when scrolled into view</div>
</AnimatedSection>
```

### 4. **Advanced Text Effects**
```tsx
import { AnimatedText } from "@/components/ui/gsap-animations"

<AnimatedText 
  text="Your Amazing Text"
  animationType="typewriter" // typewriter, wave, glow
  className="text-4xl font-bold"
/>
```

## 🎯 Perbandingan dengan Referensi Anda

### **Referensi Anda:**
```javascript
// Single can dengan movement patterns
.to('.can > img', 3, { y:'-=30', x:'+=20', rotation:'-=5' })
.to('.can > img', 2, { y:'+=30', x:'-=20', rotation:'-=5' })
// ... pattern continues
```

### **Implementation Kami:**
```javascript
// Multiple objects dengan variasi animation
// Gentle (seperti referensi Anda)  
gsap.to(element, { y: -30, x: 20, rotation: -5, duration: 3, ease: "power1.inOut" })
gsap.to(element, { y: 30, x: -20, rotation: -10, duration: 2, ease: "power1.inOut" })

// Plus Dynamic, Complex, dan Orbit variations
```

## 🚀 Keunggulan Implementation

1. **Lebih Fleksibel** - 4 tipe animasi vs 1 di referensi
2. **Reusable Components** - Komponen dapat digunakan berulang
3. **TypeScript Support** - Type safety dan intellisense
4. **Performance Optimized** - Memoized components
5. **Responsive** - Adaptif untuk mobile dan desktop
6. **Scroll Integration** - ScrollTrigger untuk UX yang lebih baik

## 🎨 Customization Examples

### **Membuat Floating Logo**
```tsx
<GSAPFloatingElement animationType="orbit" className="absolute top-1/4 right-1/4">
  <img src="/logo.png" className="w-16 h-16" />
</GSAPFloatingElement>
```

### **Custom Floating Element**
```tsx
<GSAPFloatingElement animationType="complex">
  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full backdrop-blur-md">
    <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse" />
  </div>
</GSAPFloatingElement>
```

### **Section dengan Multiple Animations**
```tsx
<AnimatedSection animationType="wave">
  <div className="grid grid-cols-3 gap-4">
    {items.map(item => (
      <div key={item.id}>{item.content}</div>
    ))}
  </div>
</AnimatedSection>
```

## 📱 Performance Tips

1. **Lazy Loading** - GSAP ScrollTrigger dimuat dinamis
2. **Memoized Components** - Mencegah re-render
3. **Optimized Animations** - Hardware acceleration
4. **Mobile Considerations** - Reduced motion pada mobile

## 🔧 Troubleshooting

### **Jika animasi tidak berjalan:**
1. Pastikan GSAP terinstall: `npm list gsap`
2. Check browser console untuk errors
3. Refresh halaman untuk reset ScrollTrigger

### **Performance issues:**
1. Reduce jumlah floating elements
2. Gunakan `will-change: transform` pada CSS
3. Monitor dengan DevTools Performance tab

Sekarang portfolio Anda memiliki animasi yang jauh lebih canggih dan smooth dibanding sebelumnya! 🎉
