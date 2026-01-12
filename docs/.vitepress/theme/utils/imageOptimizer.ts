// 轻量级图片优化工具
export class LightweightImageOptimizer {
  
  // 添加图片懒加载和错误处理
  static optimizeExistingImages() {
    const images = document.querySelectorAll('img:not([data-optimized])')
    
    images.forEach(img => {
      // 标记已优化
      img.setAttribute('data-optimized', 'true')
      
      // 添加懒加载（如果还没有）
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy')
      }
      
      // 添加异步解码
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async')
      }
      
      // 添加错误处理
      if (!img.hasAttribute('onerror')) {
        img.addEventListener('error', () => {
          console.warn(`图片加载失败: ${img.src}`)
          // 可以设置占位图片或重试
          if (!img.classList.contains('retry-attempted')) {
            img.classList.add('retry-attempted')
            // 1秒后重试一次
            setTimeout(() => {
              img.src = img.src + '?retry=' + Date.now()
            }, 1000)
          }
        })
      }
      
      // 添加加载完成事件
      img.addEventListener('load', () => {
        img.classList.add('image-loaded')
      })
    })
  }
  

  
  // 获取图片类型
  static getImageType(src) {
    const extension = src.split('.').pop()?.toLowerCase()
    return extension || 'unknown'
  }
  
  // 优化图片显示尺寸
  static optimizeImageDisplay() {
    const images = document.querySelectorAll('img[data-optimized]')
    
    images.forEach(img => {
      // 检查是否有过大的图片
      const maxWidth = 800 // 最大显示宽度
      const maxHeight = 600 // 最大显示高度
      
      if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
        img.style.maxWidth = maxWidth + 'px'
        img.style.maxHeight = maxHeight + 'px'
        img.style.height = 'auto'
        img.style.width = 'auto'
        
        // 添加点击查看原图功能
        img.style.cursor = 'pointer'
        img.title = '点击查看原图'
        
        if (!img.hasAttribute('data-click-handler')) {
          img.setAttribute('data-click-handler', 'true')
          img.addEventListener('click', () => {
            window.open(img.src, '_blank')
          })
        }
      }
    })
  }
  
  // 初始化所有优化
  static init() {
    // 延迟执行，确保页面内容加载完成
    setTimeout(() => {
      this.optimizeExistingImages()
      this.optimizeImageDisplay()
    }, 500)
  }
}

// 添加图片优化样式
export const imageOptimizationStyles = `
img[data-optimized] {
  transition: opacity 0.3s ease-in-out;
}

img[data-optimized]:not(.image-loaded) {
  opacity: 0.7;
}

img[data-optimized].image-loaded {
  opacity: 1;
}

img[data-optimized]:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
`