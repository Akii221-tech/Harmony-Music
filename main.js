document.getElementById('downloadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const urlInput = document.getElementById('musicUrl');
            const url = urlInput.value.trim();
            
            if (!isValidUrl(url)) {
                urlInput.classList.add('input-shake');
                setTimeout(() => {
                    urlInput.classList.remove('input-shake');
                }, 500);
                return;
            }
            
            document.getElementById('qualitySelect').classList.remove('hidden');
            document.getElementById('downloadBtn').classList.add('hidden');
            document.getElementById('progressContainer').classList.remove('hidden');
            
            simulateDownload(url);
        });
        
        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }
        
        function simulateDownload(url) {
            let progress = 0;
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');
            const statusText = document.getElementById('statusText');
            
            const progressInterval = setInterval(() => {
                progress += Math.floor(Math.random() * 10) + 5;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = `${progress}%`;
                progressPercent.textContent = `${progress}%`;
                
                if (progress < 30) {
                    statusText.textContent = 'Connecting to source...';
                } else if (progress < 70) {
                    statusText.textContent = 'Downloading music...';
                } else if (progress < 90) {
                    statusText.textContent = 'Processing audio...';
                } else {
                    statusText.textContent = 'Almost done...';
                }
                
                if (progress === 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        document.getElementById('progressContainer').classList.add('hidden');
                        document.getElementById('successAlert').classList.remove('hidden');
                        document.getElementById('downloadBtn').classList.remove('hidden');
                        document.getElementById('musicUrl').value = '';
                        
                        // Create a temporary download link
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(new Blob(['Simulated music file content for ' + url], {type: 'audio/mpeg'}));
                        a.download = 'downloaded-music.mp3';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        setTimeout(() => {
                            document.getElementById('successAlert').classList.add('hidden');
                        }, 3000);
                    }, 500);
                }
            }, 300);
        }
