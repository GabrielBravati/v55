import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings,
  IconAppWindow,
  IconListTree,
  IconBorderAll,
  IconChartHistogram,

} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Inicio',
    icon: IconHome,
    href: '/dashboards/modern',
  },
  {
    id: uniqueId(),
    title: 'Vendas',
    icon: IconAppWindow,
    href: '*',
    children: [
      {
        id: uniqueId(),
        title: 'Pedidos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Clientes',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Créditos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Relatório de Vendas',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Recibos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Metas',
        icon: IconPoint,
        href: '*',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Produtos',
    icon: IconApps,
    href: '*',
    children: [
      {
        id: uniqueId(),
        title: 'Listar Produtos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Criar Produtos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Categorias',
        icon: IconPoint,
        href: '/categorias',
      },
      {
        id: uniqueId(),
        title: 'Acabamentos',
        icon: IconPoint,
        href: '*',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Produção',
    icon: IconClipboard,
    href: '*',
    children: [
      {
        id: uniqueId(),
        title: 'Verificação de arquivos',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: '1° Ordem de produção',
        icon: IconPoint,
        href: '/pages/account-settings',
      },
      {
        id: uniqueId(),
        title: '2ª OP - Pré-Impressão',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: '4ª OP - Acabamento',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: '4ª OP - Acabamento em Massa',
        icon: IconPoint,
        href: '*',

      },
      {
        id: uniqueId(),
        title: 'Revisão de OP',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Pedidos em produção',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Pedidos em Análise',
        icon: IconPoint,
        href: '*',
        children: [
          {
            id: uniqueId(),
            title: 'Error',
            icon: IconAlertCircle,
            href: '/400',
          },
          {
            id: uniqueId(),
            title: 'Maintenance',
            icon: IconSettings,
            href: '/auth/maintenance',
          },
          {
            id: uniqueId(),
            title: 'Login',
            icon: IconLogin,
            href: '/auth/login',
            children: [
              {
                id: uniqueId(),
                title: 'Side Login',
                icon: IconPoint,
                href: '/auth/login',
              },
              {
                id: uniqueId(),
                title: 'Boxed Login',
                icon: IconPoint,
                href: '/auth/login2',
              },
            ]
          },
          {
            id: uniqueId(),
            title: 'Two Steps',
            icon: IconZoomCode,
            href: '/auth/two-steps',
            children: [
              {
                id: uniqueId(),
                title: 'Side Two Steps',
                icon: IconPoint,
                href: '/auth/two-steps',
              },
              {
                id: uniqueId(),
                title: 'Boxed Two Steps',
                icon: IconPoint,
                href: '/auth/two-steps2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Entregas',
    icon: IconFileDescription,
    href: '*',
    children: [
      {
        id: uniqueId(),
        title: 'Rotas de Entrega',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Romaneio',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Retorno de Entrega',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Graflog',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Jadlog',
        icon: IconPoint,
        href: '*',
      }
    ],
  },
  {
    id: uniqueId(),
    title: 'Marketing',
    icon: IconBorderAll,
    href: '*',
    children: [
      {
        id: uniqueId(),
        title: 'Cupons',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Kits',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Newsletter',
        icon: IconPoint,
        href: '*',
      },
      {
        id: uniqueId(),
        title: 'Assinaturas',
        icon: IconPoint,
        href: '*',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Loja',
    icon: IconChartHistogram,
    href: '*',
  },
  
];
export default Menuitems;
