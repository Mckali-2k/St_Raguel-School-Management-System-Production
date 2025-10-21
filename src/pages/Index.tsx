import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { eventService, FirestoreEvent, Timestamp } from "@/lib/firestore";
import { BookOpen, Music, Languages, Heart, Users, Target, FileText } from 'lucide-react';


const Index = () => {
  const departments = [
    {
      title: 'Theology & Scripture',
      description: 'Deep study of Christian theology and biblical studies',
      icon: BookOpen
    },
    {
      title: 'Church Music & Liturgy',
      description: 'Traditional music, chants, and liturgical practices',
      icon: Music
    },
    {
      title: 'Ancient Languages',
      description: 'Geez, Amharic, and other liturgical languages',
      icon: Languages
    },
    {
      title: 'Spiritual Formation',
      description: 'Personal faith development and spiritual growth',
      icon: Heart
    },
    {
      title: 'Community Service',
      description: 'Outreach programs and community engagement',
      icon: Users
    },
    {
      title: 'Church History',
      description: 'Ethiopian Orthodox heritage and traditions',
      icon: Clock
    },
    {
      title: 'Sacred Arts',
      description: 'Iconography, calligraphy, and crafts',
      icon: Target
    },
    {
      title: 'Practical Studies',
      description: 'Mathematics, science, and general subjects',
      icon: FileText
    }
  ];
  const stats = [
    { number: '500+', label: 'Students', description: 'Enrolled across all programs' },
    { number: '30+', label: 'Years', description: 'Of educational excellence' },
    { number: '50+', label: 'Faculty', description: 'Dedicated Orthodox educators' },
    { number: '1', label: 'Beautiful Campus', description: 'Peaceful learning environment' }
  ];
  const [events, setEvents] = useState<FirestoreEvent[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await eventService.getAllEvents();
        setEvents(list);
      } catch {
        setEvents([]);
      }
    })();
  }, []);

  const top3 = useMemo(() => {
    const now = new Date();
    return events
      .filter(ev => (ev.date as Timestamp).toDate() >= now)
      .slice(0, 3);
  }, [events]);

  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="assets/message-from-school-img.png"
                alt="School Building"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.message.title')}</h2>
              <p className="text-gray-600 mb-4">{t('home.message.subtitle')}</p>
              <p className="text-gray-600 mb-6">{t('home.message.body')}</p>
              <Link 
                to="/admissions"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                {t('home.message.cta')}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.events.title')}</h2>
              <p className="text-lg text-gray-600">{t('home.events.subtitle')}</p>
            </div>
            <div className="space-y-4 mb-8">
              {top3.map(ev => (
               
                <div key={ev.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{ev.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅{(ev.date as Timestamp).toDate().toLocaleDateString()}</span>
                      <span>🕐 {ev.time || '—'}</span>
                      <span>📍{ev.location || '—'}</span>
                    </div>
                  </div>
                  
                </div>
              </div>
              ))}
              {!top3.length && (
                <div className="md:col-span-3 text-center text-gray-500">{t('events.noEvents') || 'No upcoming events.'}</div>
              )}
            </div>
            <div className="text-center">
              <Link 
                to="/calendar"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                {t('events.viewCalendar')}
              </Link>
            </div>
          </div>
        </section>


        {/* Academic Departments */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.academicDepartments.title')}</h2>
            <p className="text-lg text-gray-600">{t('home.academicDepartments.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.title}</h3>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/academic"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Explore All Programs →
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-[#13A0E2] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm opacity-90">{stat.description}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/academic"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Get to Know Us →
              </Link>
            </div>
          </div>
        </div>
        
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
