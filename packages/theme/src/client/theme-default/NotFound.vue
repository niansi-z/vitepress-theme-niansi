<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import NSNotFound from './components/icons/NSNotFound.vue'
import { useLangs } from './composables/langs'

const { theme } = useData()
const { currentLang } = useLangs()
</script>

<template>
  <div class="NotFound">
    <div class="container">
      <div class="content" role="main" :aria-labelledby="'notfound-title'">
        <p class="code" aria-hidden="true">{{ theme.notFound?.code ?? '404' }}</p>
        <h1 class="title">{{ theme.notFound?.title ?? 'PAGE NOT FOUND' }}</h1>
        <blockquote class="quote">
          {{
            theme.notFound?.quote ??
            "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
          }}
        </blockquote>
        <div class="action">
          <a
            :href="withBase(theme.notFound?.link ?? currentLang.link)"
            class="link"
            :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
          >
            {{ theme.notFound?.linkText ?? 'Take me home' }}
          </a>
        </div>
      </div>
      <div class="inbetweening" aria-hidden="true">
        <NSNotFound class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  margin-top: 2rem;
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  margin-top: 60px;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.code {
  font-size: 40px;
  font-synthesis: style;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
}

.quote {
  font-size: 16px;
  margin-top: 10px;
}

.code,
.title,
.quote {
  color: var(--ns-text-muted-color);
}

.action {
  margin-top: 20px;
}

.link {
  background: var(--ns-link-color);
  color: var(--ns-bg);
  border: 1px solid var(--ns-link-color);
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 38px;
  font-weight: 500;
}

.link:hover {
  opacity: 0.8;
}

.inbetweening {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
}

.icon {
  width: 100%;
  height: 100%;
}

@media (min-width: 850px) {
  .NotFound {
    margin-top: 2.5rem;
  }
}

@media (min-width: 1200px) {
  .NotFound {
    padding: 0 0.25rem;
  }

  .container {
    align-items: center;
    margin-top: 120px;
    flex-direction: row;
  }

  .content {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    min-width: 384px;
    text-align: unset;
  }
}
</style>
