import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Check, X, BarChart3, Clock, CheckCircle, Circle } from 'lucide-react';

const TranslationApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentLang, setCurrentLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    pt: { name: 'Português', flag: '🇵🇹' },
    zh: { name: '中文', flag: '🇨🇳' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    hi: { name: 'हिन्दी', flag: '🇮🇳' },
    ru: { name: 'Русский', flag: '🇷🇺' }
  };

  const translations = {
    en: {
      title: 'Todo List',
      placeholder: 'Add a new task...',
      addButton: 'Add',
      empty: 'No tasks yet. Add one above!',
      complete: 'Complete',
      delete: 'Delete',
      summary: 'Task Summary',
      notStarted: 'Not Started',
      inProgress: 'In Progress',
      completed: 'Completed',
      markInProgress: 'Mark as In Progress'
    },
    es: {
      title: 'Lista de Tareas',
      placeholder: 'Añadir nueva tarea...',
      addButton: 'Añadir',
      empty: '¡No hay tareas aún. Añade una arriba!',
      complete: 'Completar',
      delete: 'Eliminar',
      summary: 'Resumen de Tareas',
      notStarted: 'No Iniciado',
      inProgress: 'En Progreso',
      completed: 'Completado',
      markInProgress: 'Marcar como En Progreso'
    },
    fr: {
      title: 'Liste de Tâches',
      placeholder: 'Ajouter une nouvelle tâche...',
      addButton: 'Ajouter',
      empty: 'Pas encore de tâches. Ajoutez-en une ci-dessus!',
      complete: 'Terminer',
      delete: 'Supprimer',
      summary: 'Résumé des Tâches',
      notStarted: 'Non Commencé',
      inProgress: 'En Cours',
      completed: 'Terminé',
      markInProgress: 'Marquer comme En Cours'
    },
    de: {
      title: 'Aufgabenliste',
      placeholder: 'Neue Aufgabe hinzufügen...',
      addButton: 'Hinzufügen',
      empty: 'Noch keine Aufgaben. Fügen Sie oben eine hinzu!',
      complete: 'Abschließen',
      delete: 'Löschen',
      summary: 'Aufgabenübersicht',
      notStarted: 'Nicht Begonnen',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      markInProgress: 'Als In Bearbeitung markieren'
    },
    it: {
      title: 'Lista delle Cose da Fare',
      placeholder: 'Aggiungi una nuova attività...',
      addButton: 'Aggiungi',
      empty: 'Nessuna attività ancora. Aggiungine una sopra!',
      complete: 'Completa',
      delete: 'Elimina',
      summary: 'Riepilogo Attività',
      notStarted: 'Non Iniziato',
      inProgress: 'In Corso',
      completed: 'Completato',
      markInProgress: 'Segna come In Corso'
    },
    pt: {
      title: 'Lista de Tarefas',
      placeholder: 'Adicionar nova tarefa...',
      addButton: 'Adicionar',
      empty: 'Sem tarefas ainda. Adicione uma acima!',
      complete: 'Concluir',
      delete: 'Excluir',
      summary: 'Resumo de Tarefas',
      notStarted: 'Não Iniciado',
      inProgress: 'Em Progresso',
      completed: 'Concluído',
      markInProgress: 'Marcar como Em Progresso'
    },
    zh: {
      title: '待办事项',
      placeholder: '添加新任务...',
      addButton: '添加',
      empty: '还没有任务。在上面添加一个！',
      complete: '完成',
      delete: '删除',
      summary: '任务摘要',
      notStarted: '未开始',
      inProgress: '进行中',
      completed: '已完成',
      markInProgress: '标记为进行中'
    },
    ja: {
      title: 'ToDoリスト',
      placeholder: '新しいタスクを追加...',
      addButton: '追加',
      empty: 'タスクはまだありません。上に追加してください！',
      complete: '完了',
      delete: '削除',
      summary: 'タスクの概要',
      notStarted: '未開始',
      inProgress: '進行中',
      completed: '完了',
      markInProgress: '進行中としてマーク'
    },
    ko: {
      title: '할 일 목록',
      placeholder: '새 작업 추가...',
      addButton: '추가',
      empty: '아직 작업이 없습니다. 위에 추가하세요!',
      complete: '완료',
      delete: '삭제',
      summary: '작업 요약',
      notStarted: '시작 안 함',
      inProgress: '진행 중',
      completed: '완료됨',
      markInProgress: '진행 중으로 표시'
    },
    ar: {
      title: 'قائمة المهام',
      placeholder: 'أضف مهمة جديدة...',
      addButton: 'إضافة',
      empty: 'لا توجد مهام بعد. أضف واحدة أعلاه!',
      complete: 'إكمال',
      delete: 'حذف',
      summary: 'ملخص المهام',
      notStarted: 'لم يبدأ',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتمل',
      markInProgress: 'وضع علامة قيد التنفيذ'
    },
    hi: {
      title: 'कार्य सूची',
      placeholder: 'नया कार्य जोड़ें...',
      addButton: 'जोड़ें',
      empty: 'अभी तक कोई कार्य नहीं। ऊपर एक जोड़ें!',
      complete: 'पूर्ण',
      delete: 'हटाएं',
      summary: 'कार्य सारांश',
      notStarted: 'शुरू नहीं हुआ',
      inProgress: 'प्रगति में',
      completed: 'पूर्ण',
      markInProgress: 'प्रगति में चिह्नित करें'
    },
    ru: {
      title: 'Список дел',
      placeholder: 'Добавить новую задачу...',
      addButton: 'Добавить',
      empty: 'Задач пока нет. Добавьте одну выше!',
      complete: 'Завершить',
      delete: 'Удалить',
      summary: 'Сводка задач',
      notStarted: 'Не начато',
      inProgress: 'В процессе',
      completed: 'Завершено',
      markInProgress: 'Отметить как В процессе'
    }
  };

  // Translation function that would call your backend API
  const translateText = async (text, targetLang) => {
    // IMPORTANT: In a real app, this would call YOUR backend server
    // which would then call Google Translate API with your secure API key
    
    try {
      // Example of how to call your backend (you would need to set this up):
      /*
      const response = await fetch('https://your-backend.com/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          targetLang: targetLang,
          sourceLang: 'auto' // auto-detect source language
        })
      });
      
      const data = await response.json();
      return data.translatedText;
      */
      
      // For demo purposes, using a simple simulation
      // In production, replace this with actual API call above
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      await delay(100); // Simulate API delay
      
      // Check if we have a predefined translation
      const commonTranslations = {
        'Buy groceries': {
          es: 'Comprar comestibles',
          fr: 'Acheter des courses',
          de: 'Lebensmittel kaufen',
          it: 'Comprare generi alimentari',
          pt: 'Comprar mantimentos',
          zh: '买杂货',
          ja: '食料品を買う',
          ko: '장보기',
          ar: 'شراء البقالة',
          hi: 'किराने का सामान खरीदें',
          ru: 'Купить продукты'
        },
        'Call mom': {
          es: 'Llamar a mamá',
          fr: 'Appeler maman',
          de: 'Mama anrufen',
          it: 'Chiamare mamma',
          pt: 'Ligar para mamãe',
          zh: '给妈妈打电话',
          ja: 'お母さんに電話する',
          ko: '엄마에게 전화하기',
          ar: 'اتصل بأمي',
          hi: 'माँ को फोन करें',
          ru: 'Позвонить маме'
        },
        'Study for exam': {
          es: 'Estudiar para el examen',
          fr: 'Étudier pour l\'examen',
          de: 'Für die Prüfung lernen',
          it: 'Studiare per l\'esame',
          pt: 'Estudar para o exame',
          zh: '为考试学习',
          ja: '試験勉強をする',
          ko: '시험 공부하기',
          ar: 'الدراسة للامتحان',
          hi: 'परीक्षा के लिए अध्ययन करें',
          ru: 'Учиться к экзамену'
        }
      };

      if (commonTranslations[text] && commonTranslations[text][targetLang]) {
        return commonTranslations[text][targetLang];
      }

      // For demo: return text with language indicator
      return `[${targetLang}] ${text}`;
      
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback: return original text if translation fails
      return text;
    }
  };

  const addTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        originalText: inputValue,
        translations: { [currentLang]: inputValue },
        status: 'notStarted', // 'notStarted', 'inProgress', 'completed'
        originalLang: currentLang
      };

      // Translate to all other languages
      setIsTranslating(true);
      const translationPromises = Object.keys(languages)
        .filter(lang => lang !== currentLang)
        .map(async (lang) => {
          const translated = await translateText(inputValue, lang);
          newTodo.translations[lang] = translated;
        });

      await Promise.all(translationPromises);
      setIsTranslating(false);

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const updateTodoStatus = (id, newStatus) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getTaskCounts = () => {
    const counts = {
      notStarted: todos.filter(todo => todo.status === 'notStarted').length,
      inProgress: todos.filter(todo => todo.status === 'inProgress').length,
      completed: todos.filter(todo => todo.status === 'completed').length
    };
    counts.total = todos.length;
    return counts;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTranslating) {
      addTodo();
    }
  };

  const t = translations[currentLang];
  const taskCounts = getTaskCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Globe className="text-purple-600" />
              {t.title}
            </h1>
            
            {/* Language Selector */}
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="px-4 py-2 bg-purple-100 border-2 border-purple-300 rounded-lg text-purple-700 font-medium focus:outline-none focus:border-purple-500 transition-colors"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Task Summary Dashboard */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 className="text-purple-600" size={20} />
              {t.summary}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="flex items-center justify-center mb-1">
                  <Circle className="text-gray-500" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-700">{taskCounts.notStarted}</div>
                <div className="text-sm text-gray-500">{t.notStarted}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <div className="text-2xl font-bold text-blue-600">{taskCounts.inProgress}</div>
                <div className="text-sm text-gray-500">{t.inProgress}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div className="text-2xl font-bold text-green-600">{taskCounts.completed}</div>
                <div className="text-sm text-gray-500">{t.completed}</div>
              </div>
            </div>
            {taskCounts.total > 0 && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-gray-500 transition-all duration-300"
                    style={{ width: `${(taskCounts.notStarted / taskCounts.total) * 100}%` }}
                  />
                  <div 
                    className="bg-blue-500 transition-all duration-300"
                    style={{ width: `${(taskCounts.inProgress / taskCounts.total) * 100}%` }}
                  />
                  <div 
                    className="bg-green-500 transition-all duration-300"
                    style={{ width: `${(taskCounts.completed / taskCounts.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-gray-700"
              disabled={isTranslating}
            />
            <button
              onClick={addTodo}
              disabled={isTranslating || !inputValue.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus size={20} />
              {t.addButton}
            </button>
          </div>

          {/* Loading indicator */}
          {isTranslating && (
            <div className="text-center py-2 text-purple-600 text-sm">
              Translating to all languages...
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center py-8 text-gray-500">{t.empty}</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg transition-all hover:shadow-md ${
                    todo.status === 'completed' ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {todo.status === 'notStarted' && (
                      <button
                        onClick={() => updateTodoStatus(todo.id, 'inProgress')}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title={t.markInProgress}
                      >
                        <Circle size={24} />
                      </button>
                    )}
                    {todo.status === 'inProgress' && (
                      <button
                        onClick={() => updateTodoStatus(todo.id, 'completed')}
                        className="text-blue-500 hover:text-green-500 transition-colors"
                        title={t.complete}
                      >
                        <Clock size={24} />
                      </button>
                    )}
                    {todo.status === 'completed' && (
                      <button
                        onClick={() => updateTodoStatus(todo.id, 'notStarted')}
                        className="text-green-500 hover:text-gray-400 transition-colors"
                      >
                        <CheckCircle size={24} />
                      </button>
                    )}
                  </div>
                  
                  <span
                    className={`flex-1 text-gray-700 ${
                      todo.status === 'completed' ? 'line-through' : ''
                    }`}
                  >
                    {todo.translations[currentLang] || todo.originalText}
                  </span>
                  
                  <span className="text-xs text-gray-400">
                    {languages[todo.originalLang].flag}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title={t.delete}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationApp;