        // --- 1. إدارة التنقل بين الصفحات (SPA Routing) ---
        // هذه الدالة تخفي كل الأقسام وتظهر القسم المطلوب لمحاكاة تعدد الصفحات
        function navigate(pageId) {
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
            window.scrollTo(0, 0); // رفع الشاشة للأعلى عند تغيير الصفحة
        }

        // --- 2. بيانات الفعاليات الوهمية ---
        const eventsData = [
            { id: 1, title: 'ندوة البرمجة الحديثة', date: '2026-07-20', location: 'المدرج الأول', category: 'تقنية', img: 'https://picsum.photos/id/2/400/250', desc: 'ندوة شاملة تتناول أطر العمل الحديثة في تطوير تطبيقات الويب، وكيفية بناء تطبيقات متجاوبة وسريعة.' },
            { id: 2, title: 'ماراثون الجامعة', date: '2026-07-25', location: 'الملعب الرئيسي', category: 'رياضة', img: 'https://picsum.photos/id/3/400/250', desc: 'حدث رياضي سنوي يجمع الطلاب والأساتذة لتعزيز اللياقة البدنية والروح الرياضية.' },
            { id: 3, title: 'معرض الكتاب', date: '2026-08-01', location: 'المكتبة المركزية', category: 'ثقافة', img: 'https://picsum.photos/id/4/400/250', desc: 'معرض يضم آلاف الكتب في مختلف المجالات والتخصصات الجامعية.' },
            { id: 4, title: 'حفل الموسيقى الكلاسيكية', date: '2026-08-10', location: 'المسرح الكبير', category: 'موسيقى', img: 'https://picsum.photos/id/5/400/250', desc: 'أمسية موسيقية رائعة تحييها فرقة الجامعة.' },
            { id: 5, title: 'يوم العائلة المفتوح', date: '2026-08-15', location: 'حديقة الجامعة', category: 'عائلي', img: 'https://picsum.photos/id/6/400/250', desc: 'يوم ترفيهي لطلاب الجامعة وعائلاتهم.' },
            { id: 6, title: 'ورشة الذكاء الاصطناعي', date: '2026-08-20', location: 'مختبر الحاسوب', category: 'تقنية', img: 'https://picsum.photos/id/7/400/250', desc: 'ورشة عمل تطبيقية حول بناء نماذج تعلم الآلة.' }
        ];

        // --- 3. توليد بطاقات الفعاليات ديناميكياً ---
        function renderEvents(eventsToRender) {
            const container = document.getElementById('allEventsContainer');
            container.innerHTML = ''; // تفريغ الحاوية
            
            if(eventsToRender.length === 0) {
                container.innerHTML = '<div class="col-12 text-center py-5">لا توجد فعاليات مطابقة للبحث.</div>';
                return;
            }

            eventsToRender.forEach(ev => {
                const cardHtml = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${ev.img}" class="card-img-top" alt="${ev.title}">
                            <div class="card-body">
                                <span class="badge bg-primary mb-2">${ev.category}</span>
                                <h5 class="card-title">${ev.title}</h5>
                                <p class="card-text small"><i class="fa-regular fa-calendar"></i> ${ev.date}</p>
                                <p class="card-text text-truncate">${ev.desc}</p>
                                <button onclick="viewEventDetails(${ev.id})" class="btn btn-outline-primary w-100">التفاصيل</button>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        // --- 4. الفلترة والبحث ---
        function filterEventsList() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const category = document.getElementById('categoryFilter').value;
            const date = document.getElementById('dateFilter').value;

            // حفظ تفضيل التصنيف في localStorage (Bonus)
            localStorage.setItem('preferredCategory', category);

            const filtered = eventsData.filter(ev => {
                const matchName = ev.title.toLowerCase().includes(searchTerm);
                const matchCategory = category === 'all' || ev.category === category;
                const matchDate = !date || ev.date === date;
                return matchName && matchCategory && matchDate;
            });

            renderEvents(filtered);
        }

        function clearFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('categoryFilter').value = 'all';
            document.getElementById('dateFilter').value = '';
            filterEventsList();
        }

        // دالة الفلترة السريعة من الصفحة الرئيسية
        function filterEvents(category) {
            document.getElementById('categoryFilter').value = category;
            filterEventsList();
        }

        // --- 5. عرض تفاصيل فعالية محددة ---
        function viewEventDetails(id) {
            const event = eventsData.find(e => e.id === id);
            if(event) {
                document.getElementById('detailTitle').textContent = event.title;
                document.getElementById('detailDate').textContent = event.date;
                document.getElementById('detailLocation').textContent = event.location;
                document.getElementById('detailCategory').textContent = event.category;
                document.getElementById('detailDesc').textContent = event.desc;
                document.getElementById('detailImg').src = event.img;
                navigate('event-details');
            }
        }

        // --- 6. التحقق من نموذج اتصل بنا (Form Validation) ---
        function handleContactSubmit(event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة
            const form = document.getElementById('contactForm');
            const alertBox = document.getElementById('contactAlert');

            if (!form.checkValidity()) {
                // إذا كانت الحقول غير صالحة
                event.stopPropagation();
                form.classList.add('was-validated');
                alertBox.className = 'alert alert-danger';
                alertBox.textContent = 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.';
                alertBox.classList.remove('d-none');
            } else {
                // إذا كانت صالحة
                form.classList.remove('was-validated');
                alertBox.className = 'alert alert-success';
                alertBox.textContent = 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.';
                alertBox.classList.remove('d-none');
                form.reset(); // تفريغ الحقول
            }
        }

        // --- 7. ميزة الوضع الليلي (Dark Mode - Bonus) ---
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        // التحقق من التفضيل المحفوظ سابقاً
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // --- 8. زر العودة للأعلى (Scroll-to-top - Bonus) ---
        const scrollTopBtn = document.getElementById("scrollTopBtn");
        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- 9. التهيئة عند تحميل الصفحة ---
        document.addEventListener('DOMContentLoaded', () => {
            // استرجاع التصنيف المفضل من localStorage إن وجد
            const savedCategory = localStorage.getItem('preferredCategory');
            if (savedCategory) {
                const categorySelect = document.getElementById('categoryFilter');
                // التحقق مما إذا كان الخيار موجوداً ضمن القائمة
                const optionExists = Array.from(categorySelect.options).some(opt => opt.value === savedCategory);
                if(optionExists) {
                    categorySelect.value = savedCategory;
                }
            }
            // تحميل الفعاليات الابتدائية
            filterEventsList();
        });

