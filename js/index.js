document.addEventListener('DOMContentLoaded', () => {
   const tabHeadPhone  = () => {
        const tabBtn = document.querySelectorAll('.tab_btn');
        const headphone = document.querySelector('.headphone');
        const headphoneImgs = [
            {
                sunset: {
                    src: "img/bg_beoplay_h100_sunset.webp",
                    alt: "BeoplayH1000033"
                },
                black: {
                    src: "img/bg_beoplay_h100_infinite_black.webp",
                    alt: "BeoplayH1000033"
                },
                hourglass: {
                    src: "img/bg_beoplay_h100_hourglass.webp",
                    alt: "BeoplayH1000033"
                }
            }
        ];

        tabBtn.forEach((ele) => {
            ele.addEventListener('click', () => {
                tabBtn.forEach(el => {
                    el.classList.remove('active');
                });
                
                const color = ele.dataset.color;
                headphone.setAttribute('src', headphoneImgs[0][color].src);
                headphone.setAttribute('alt', headphoneImgs[0][color].alt);

                ele.classList.add('active');
            });
        });
   }
   tabHeadPhone();

   const historyChnage = () => {
        const historyDummy = {
            1920: {
                h1_text: "1920'S",
                p_text: "Established by Peter Bang and Ole Olufsen in Denmark",
                bg_url: "url(img/img_history_1920.webp)"
            },
            1930: {
                h1_text: "1930'S",
                p_text: "Development of the first radio and audio equipment. Since then, the philosophy of technology and design has been established",
                bg_url: "url(img/img_history_1930.webp)"
            },
            1960: {
                h1_text: "1960'S",
                p_text: "Bang & Olufsen began to gain recognition in the global market with its own design language and advanced audio system",
                bg_url: "url(img/img_history_1960.webp)"
            },
            1970: {
                h1_text: "1970'S",
                p_text: "Further strengthening its reputation with the introduction of innovative audio technology. Outstanding performance in speakers and audio systems, especially as a high-end brand with both design and performance",
                bg_url: "url(img/img_history_1970.webp)"
            }
        }
        const historyBullet = document.querySelectorAll(".history_bullet > li");
        const historyBulletLeft = document.querySelector(".history_left");
        const historyBulletRight = document.querySelector(".history_right");
        const historyH1 = document.querySelector(".history > h1");
        const historyP = document.querySelector(".history > p");
        const bgHistory = document.querySelector(".bg_history");

        let counter = 0;
        let dummyhistory;

        if(counter===3) {
            historyBulletRight.classList.add("disable");
        } else if (counter===0) {
            historyBulletLeft.classList.add("disable");
        } 

        historyBulletLeft.addEventListener('click', (e) => {
            if(counter > 0 && counter < 4) {
                counter -= 1;
            }
            if(counter === 0) {
                historyBulletLeft.classList.add("disable");
            } else {
                historyBulletLeft.classList.remove("disable");
                historyBulletRight.classList.remove("disable");
            }
            historyBullet.forEach(el => el.classList.remove("on"));
            historyBullet[counter].classList.add("on");
            dummyhistory = historyBullet[counter].dataset.history;
            historyH1.innerHTML = historyDummy[dummyhistory].h1_text;
            historyP.innerHTML = historyDummy[dummyhistory].p_text;
            bgHistory.style.backgroundImage = historyDummy[dummyhistory].bg_url;
        });
        historyBulletRight.addEventListener('click', (e) => {
            if(counter >= 0 && counter < 3) {
                counter += 1;
            }
            if(counter === 3) {
                historyBulletRight.classList.add("disable");
            } else {
                historyBulletLeft.classList.remove("disable");
                historyBulletRight.classList.remove("disable");
            }
            historyBullet.forEach(el => el.classList.remove("on"));
            historyBullet[counter].classList.add("on");
            dummyhistory = historyBullet[counter].dataset.history;
            historyH1.innerHTML = historyDummy[dummyhistory].h1_text;
            historyP.innerHTML = historyDummy[dummyhistory].p_text;
            bgHistory.style.backgroundImage = historyDummy[dummyhistory].bg_url;
        });
   }
   historyChnage();
});