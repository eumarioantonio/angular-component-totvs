# 🎯 TOTVS Frontend Test - Biblioteca de componentes

Biblioteca de componentes Angular reutilizáveis desenvolvida como teste técnico para TOTVS.

## 🚀 Demo Online

**[Ver demonstração ao vivo →](https://eumarioantonio.github.io/angular-component-totvs/)**

## 📦 Componentes Implementados

### Select Component
Componente de seleção customizável com suporte completo a acessibilidade e navegação por teclado.

**Funcionalidades:**
- ✅ Suporte a `ngModel` e `Reactive Forms`
- ✅ Opções customizáveis via interface `SelectOption`
- ✅ Estado disabled (componente e itens individuais)
- ✅ Navegação completa por teclado (WAI-ARIA compliant)
- ✅ Estados visuais (hover, focus, error, disabled)
- ✅ Placeholder customizável
- ✅ Tratamento de itens desabilitados

**Navegação por teclado:**
- `Tab` - Foco no componente
- `Enter/Space` - Abre dropdown / Seleciona item
- `ArrowDown/ArrowUp` - Navega entre opções
- `Home/End` - Primeira/última opção
- `Escape` - Fecha dropdown

### Switch Component
Componente toggle simples e acessível para valores booleanos.

**Funcionalidades:**
- ✅ Suporte a `ngModel` e `Reactive Forms`
- ✅ Estado disabled
- ✅ Evento de mudança (`valueChange`)
- ✅ Navegação por teclado
- ✅ Role `switch` (WAI-ARIA)
- ✅ Indicador visual de estado (checked/unchecked)

## 🏗️ Arquitetura

### Decisão: Workspace Angular

Este projeto foi estruturado como **Angular Workspace** com separação entre library e demo app.

#### Por que Workspace (e não NX)?

Embora eu tenha familiaridade com **NX Monorepo** e reconheça seus benefícios para projetos enterprise (affected commands, caching distribuído, dependency graph visualization), optei pelo **Angular Workspace** pelos seguintes motivos:

**Pragmatismo técnico:**
- ✅ Escopo do teste: 2 componentes + demo
- ✅ Workspace oferece isolamento e organização suficientes
- ✅ Setup mais simples e direto
- ✅ Zero overhead de configuração adicional
- ✅ Foco em qualidade de código, não em tooling

**Alinhamento com objetivo:**
- ✅ Demonstrar domínio de Angular e TypeScript
- ✅ Componentes reutilizáveis e bem arquitetados
- ✅ Código limpo e manutenível
- ✅ Capacidade de escolher a ferramenta certa para o contexto

**Escalabilidade futura:**
- ✅ Estrutura permite evolução para NX se necessário
- ✅ Separação clara lib/app facilita migração
- ✅ Padrões seguem boas práticas de monorepo

#### Inspiração: PO UI

A estrutura foi inspirada no [PO UI](https://github.com/po-ui/po-angular), biblioteca open source da TOTVS, que também utiliza separação entre library e aplicações de demonstração.

### Estrutura do Projeto
```
angular-component-totvs/
├── projects/
│   ├── totvs-components/          # Component Library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   │   ├── select/
│   │   │   │   │   └── switch/
│   │   │   │   ├── models/
│   │   │   │   └── styles/
│   │   │   └── public-api.ts
│   │   └── README.md
│   └── demo-app/                  # Demo Application
│       ├── src/
│       │   └── app/
│       │       └── pages/demo/
│       └── README.md
├── .github/workflows/             # CI/CD (GitHub Pages)
├── README.md
└── package.json
```

## 🎨 Design System

Componentes desenvolvidos seguindo rigorosamente os handoffs fornecidos:

- **Design Tokens:** Cores, espaçamentos e tipografia conforme especificação
- **Estados visuais:** Normal, hover, focus, disabled, error
- **Responsividade:** Mobile, tablet e desktop
- **Acessibilidade:** WAI-ARIA compliant

## ♿ Acessibilidade

Todos os componentes seguem as diretrizes **WCAG 2.1** e **WAI-ARIA**:

- ✅ Navegação completa por teclado
- ✅ Roles semânticos apropriados
- ✅ Estados ARIA (aria-expanded, aria-checked, aria-disabled)
- ✅ Labels e descrições para tecnologias assistivas
- ✅ Foco visível em todos os estados
- ✅ Contraste de cores adequado
- ✅ Suporte a zoom até 200%

## 🧪 Testes

- **Testes unitários** (Jasmine + Karma)
- Cobertura dos principais cenários de uso
- Testes de integração com formulários (ngModel e Reactive Forms)
- Testes de navegação por teclado
- Testes de estados (disabled, error)

**Executar testes:**
```bash
npm test
```

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
# Rodar demo app
ng serve demo-app

# Build da library
ng build totvs-components

# Testes
npm test

# Build para produção
ng build totvs-components --configuration production
ng build demo-app --configuration production
```

### Uso dos Componentes

#### Select Component
```typescript
// app.component.ts
import { Component } from '@angular/core';
import { SelectOption } from 'totvs-components';

@Component({
  selector: 'app-root',
  template: `
    <app-select
      [options]="options"
      [(ngModel)]="selectedValue"
      placeholder="Escolha uma opção"
      [disabled]="false">
    </app-select>
  `
})
export class AppComponent {
  options: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3', disabled: true }
  ];
  
  selectedValue = '';
}
```

**Com Reactive Forms:**
```typescript
import { FormControl } from '@angular/forms';

selectControl = new FormControl('');

// Template
<app-select
  [options]="options"
  [formControl]="selectControl">
</app-select>
```

#### Switch Component
```typescript
// Template
<app-switch
  [(ngModel)]="isEnabled"
  (valueChange)="onToggle($event)"
  [disabled]="false"
  ariaLabel="Ativar notificações">
</app-switch>

// Component
isEnabled = false;

onToggle(value: boolean) {
  console.log('Switch alterado:', value);
}
```

## 🛠️ Tecnologias

- **Angular 17+** - Framework
- **TypeScript** - Linguagem
- **SCSS** - Estilos
- **Jasmine + Karma** - Testes
- **GitHub Pages** - Deploy

## 📈 Roadmap (Melhorias Futuras)

Se este projeto evoluísse para produção, eu implementaria:

### CI/CD & Qualidade
- **Husky** - Pre-commit hooks para lint e testes
- **GitHub Actions** - Pipeline de testes e deploy automatizado
- **Commitlint** - Conventional commits
- **Semantic Release** - Versionamento automático
- **ESLint + Prettier** - Configuração strict
- **Coverage mínimo 80%** - Garantia de qualidade

### Documentação
- **Storybook** - Documentação interativa completa
- **TypeDoc** - Documentação de API
- **Changelog** - Histórico de mudanças automatizado

### Escalabilidade
- **Migração para NX** - Monorepo enterprise com:
  - Affected commands (testa apenas código alterado)
  - Computation caching (builds incrementais)
  - Dependency graph visualization
  - Generators customizados
- **Publicação NPM** - Package público ou privado
- **Versionamento semântico** - Releases organizadas

### Features Adicionais
- Mais componentes (Input, Checkbox, Radio, etc.)
- Temas customizáveis (dark mode)
- Internacionalização (i18n)
- Animações avançadas

**Nota:** Priorizei funcionalidade core + qualidade base no prazo dado, mas tenho experiência com todas essas ferramentas e poderia implementá-las conforme necessidade do projeto.

## 📝 Notas de Desenvolvimento

### Desafios Superados
1. **Navegação por teclado complexa** - Implementação de skip de itens disabled e foco correto
2. **ControlValueAccessor** - Integração perfeita com ngModel e Reactive Forms
3. **Acessibilidade completa** - Roles, estados ARIA e suporte a screen readers
4. **Design tokens precisos** - Fidelidade 100% aos handoffs fornecidos

### Decisões Técnicas
- **Standalone Components:** Preparado para Angular 17+
- **BEM + SCSS:** Metodologia CSS escalável
- **Interface SelectOption:** Tipagem forte para opções
- **Event Emitters:** Comunicação clara parent-child
- **Design Tokens:** Variáveis SCSS para manutenibilidade

## 👤 Autor

**[Seu Nome]**
- GitHub: [@eumarioantonio](https://github.com/eumarioantonio)
- LinkedIn: [Seu LinkedIn]
- Email: [Seu Email]

## 📄 Licença

Este projeto foi desenvolvido como teste técnico para TOTVS.

---

**Desenvolvido com ❤️ para TOTVS**