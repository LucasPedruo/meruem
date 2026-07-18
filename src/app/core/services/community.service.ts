import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommunityData, SocialMedia, WhatsAppGroup } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private apiService: ApiService) {}

  // Obter dados da comunidade
  getCommunityData(): Observable<CommunityData> {
    return this.apiService.get<CommunityData>('community/data').pipe(
      catchError((error) => {
        console.error('Erro ao buscar dados da comunidade:', error);
        // Retornar dados mock em caso de erro (como no projeto original)
        return of(this.getMockCommunityData());
      }),
    );
  }

  // Obter redes sociais
  getSocialMedia(): Observable<SocialMedia[]> {
    return this.apiService.get<SocialMedia[]>('community/social-media').pipe(
      catchError((error) => {
        console.error('Erro ao buscar redes sociais:', error);
        return of(this.getMockSocialMedia());
      }),
    );
  }

  // Obter grupos do WhatsApp
  getWhatsAppGroups(): Observable<WhatsAppGroup[]> {
    return this.apiService.get<WhatsAppGroup[]>('community/whatsapp-groups').pipe(
      catchError((error) => {
        console.error('Erro ao buscar grupos do WhatsApp:', error);
        return of(this.getMockWhatsAppGroups());
      }),
    );
  }

  // Obter anúncios recentes
  getLatestAnnouncements(limit: number = 5): Observable<any[]> {
    return this.apiService.get<any[]>(`community/announcements?limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar anúncios:', error);
        return of([]);
      }),
    );
  }

  // Obter estatísticas da comunidade
  getCommunityStatistics(): Observable<any> {
    return this.apiService.get<any>('community/statistics').pipe(
      catchError((error) => {
        console.error('Erro ao buscar estatísticas:', error);
        return of(this.getMockStatistics());
      }),
    );
  }

  // Obter eventos/hackathons
  getEvents(status?: 'em-construcao' | 'agendado' | 'finalizado'): Observable<any[]> {
    let endpoint = 'community/events';
    if (status) {
      endpoint += `?status=${status}`;
    }

    return this.apiService.get<any[]>(endpoint).pipe(
      catchError((error) => {
        console.error('Erro ao buscar eventos:', error);
        return of([]);
      }),
    );
  }

  // Dados mock da comunidade (baseado no projeto original)
  private getMockCommunityData(): CommunityData {
    return {
      title: 'FullDev Community',
      memberCount: '5000+',
      foundedYear: 2024,
      description: 'Fala, Dev! Seja muito Bem-vindo! 😆',
      groups: {
        total: 10,
        list: [
          {
            id: '1',
            name: 'FullDev - Geral',
            memberCount: 1024,
            imageUrl: '/images/FullDev.png',
          },
          {
            id: '2',
            name: 'FullDev - Front-end',
            memberCount: 850,
            imageUrl: '/images/Frontend.png',
          },
        ],
      },
      hackathon: {
        status: 'em-construcao',
      },
      latestAnnouncement: {
        title: 'Último Aviso',
        date: '03/04/25',
        text: 'Limite de grupos atingido!',
      },
      socialMedia: this.getMockSocialMedia(),
    };
  }

  private getMockSocialMedia(): SocialMedia[] {
    return [
      {
        handle: 'Discord',
        followers: '413',
        imageUrl: '/images/FullDev.png',
        links: [{ platform: 'Discord', url: 'https://discord.com/invite/2vMkX7kc8t' }],
        recentImages: ['/images/Discord1.png', '/images/Discord2.png', '/images/Discord3.png'],
      },
      {
        handle: 'Instagram',
        followers: '48',
        imageUrl: '/images/FullDev.png',
        links: [
          {
            platform: 'Instagram',
            url: 'https://www.instagram.com/comunidadefulldev/',
          },
        ],
      },
      {
        handle: 'LinkedIn',
        followers: '1K',
        imageUrl: '/images/FullDev.png',
        links: [
          {
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/company/comunidadefulldev/',
          },
        ],
      },
      {
        handle: 'YouTube',
        followers: '19',
        imageUrl: '/images/FullDev.png',
        links: [
          {
            platform: 'YouTube',
            url: 'https://www.youtube.com/@ComunidadeFulldev',
          },
        ],
      },
    ];
  }

  private getMockWhatsAppGroups(): WhatsAppGroup[] {
    return [
      {
        id: '1',
        name: 'Comunidade no WhatsApp',
        description: 'Grupo principal da comunidade',
        imageUrl: '/images/Geral1.png',
        memberCount: 1024,
        inviteLink: 'https://chat.whatsapp.com/GtlHPlfmXlp27vPZVBej19',
        recentImages: [
          { url: '/images/Conversa1.png', timestamp: '2025-04-01T14:30:00Z' },
          { url: '/images/Conversa2.png', timestamp: '2025-04-01T13:45:00Z' },
          { url: '/images/Conversa3.png', timestamp: '2025-04-01T12:20:00Z' },
        ],
      },
      {
        id: '2',
        name: 'Queens of Deploy',
        description: 'Grupo exclusivo para mulheres desenvolvedoras',
        imageUrl: '/images/CodeQueens.png',
        memberCount: 504,
        inviteLink: 'https://chat.whatsapp.com/KOKFfsXGD1PBVWvAXXNbcb',
        recentImages: [
          { url: '/images/Conversa1.png', timestamp: '2025-04-01T14:30:00Z' },
          { url: '/images/Conversa2.png', timestamp: '2025-04-01T13:45:00Z' },
          { url: '/images/Conversa3.png', timestamp: '2025-04-01T12:20:00Z' },
        ],
      },
      {
        id: '3',
        name: 'RainbowStack',
        description: 'Grupo para pessoas LGBT da comunidade',
        imageUrl: '/images/RainbowStack.png',
        memberCount: 102,
        inviteLink: 'https://chat.whatsapp.com/BtWA88gNq3KGmAxAobB8X3',
        recentImages: [
          { url: '/images/Conversa1.png', timestamp: '2025-04-01T14:30:00Z' },
          { url: '/images/Conversa2.png', timestamp: '2025-04-01T13:45:00Z' },
          { url: '/images/Conversa3.png', timestamp: '2025-04-01T12:20:00Z' },
        ],
      },
    ];
  }
  private getMockStatistics(): any {
    return {
      totalMembers: 5000,
      totalGroups: 3,
      activeMembers: 3500,
      monthlyGrowth: 12.5,
      topGroups: [
        { name: 'Comunidade no WhatsApp', members: 1024 },
        { name: 'Queens of Deploy', members: 504 },
        { name: 'RainbowStack', members: 102 },
      ],
    };
  }

  // Buscar grupos por categoria
  getGroupsByCategory(category: string): Observable<WhatsAppGroup[]> {
    return this.getWhatsAppGroups().pipe(
      map((groups) =>
        groups.filter(
          (group) =>
            group.name.toLowerCase().includes(category.toLowerCase()) ||
            group.description.toLowerCase().includes(category.toLowerCase()),
        ),
      ),
    );
  }

  // Buscar grupos populares (ordenados por número de membros)
  getPopularGroups(limit: number = 5): Observable<WhatsAppGroup[]> {
    return this.getWhatsAppGroups().pipe(
      map((groups) => groups.sort((a, b) => b.memberCount - a.memberCount).slice(0, limit)),
    );
  }

  // Calcular total de membros de todos os grupos
  getTotalMembersCount(): Observable<number> {
    return this.getWhatsAppGroups().pipe(
      map((groups) => groups.reduce((total, group) => total + group.memberCount, 0)),
    );
  }
}
