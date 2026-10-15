'use strict';
const $=id=>document.getElementById(id), LANG_KEY='apexFuelLanguage.v1', PROFILE_KEY='apexFuelProfiles.v1';
const EN={language:'Language',eyebrow:'SIM RACING / RACE ENGINEERING',heroSub:'Calculate fuel. Plan your stints. Take control on the pit wall.',calculator:'Calculator',savedProfiles:'Saved profiles',reset:'Reset',savePlan:'Save plan',raceInfo:'Race information',raceInfoSub:'Game, track and race format',game:'Game / simulator',track:'Track',car:'Car / class',raceName:'Race name',raceFormat:'Race format',timeBased:'Timed',lapBased:'Lap-based',durationMin:'Race duration (min)',targetLaps:'Lap count',lapTime:'Average lap time',formationLaps:'Formation laps',extraLaps:'Extra laps',raceHelp:'Timed races calculate the required finish lap. Formation and extra laps are planned separately.',fuelTank:'Fuel and tank',fuelTankSub:'Consumption and starting fuel',fuelPerLap:'Fuel (L/lap)',tankCapacity:'Tank capacity (L)',startFuel:'Starting fuel (L)',safetyPct:'Safety margin (%)',consumptionDelta:'Consumption change (%)',formationPct:'Formation consumption (%)',fuelHelp:'Consumption adjustment approximates weather, traffic or driving style.',pitRules:'Pit stop rules',pitRulesSub:'Refuelling and mandatory stops',mandatoryStops:'Mandatory pit stops',pitLoss:'Pit loss (sec)',refuelRate:'Refuelling rate (L/sec)',minPitTime:'Minimum pit time (sec)',tyreChange:'Tyre change (sec)',refuelAllowed:'Refuelling',allowed:'Allowed',forbidden:'Forbidden',includeFormationFuel:'Include formation laps in total fuel',includeSafetyOnFormation:'Apply safety margin to formation laps too',fuelTarget:'FUEL TARGET',fuelTargetSub:'Total planned fuel including safety margin',raceLaps:'Race laps',totalLaps:'Total laps',raceDurationOutLabel:'Race duration',pitStops:'Pit stops',startCheck:'Starting fuel check',startCheckSub:'Fuel status on the grid',tankFill:'Tank fill',firstStint:'First stint',fuelDifference:'Fuel deficit / surplus',calculationNote:'Calculation notes',calculationNoteSub:'Interpret results correctly',calculationNoteText:'This tool provides an estimate. Validate it with your own consumption data and race rules.',stintStrategy:'Stint and pit strategy',stintStrategySub:'Recommended fuel intervals',exportCsv:'Export CSV',stint:'Stint',lapRange:'Lap range',laps:'Laps',startingFuelCol:'Start fuel',consumption:'Used',endingFuel:'End fuel',pitAction:'Pit action',lapSimulation:'Lap-by-lap fuel simulation',lapSimulationSub:'Estimated fuel level after every lap',lap:'Lap',lapType:'Lap type',fuelAfterLap:'Fuel after lap',profilesSub:'Race plans saved in this browser',profilesNote:'Profiles are stored in this browser only.',footer:'BUILT FOR THE PIT WALL · V2.0',profileName:'Profile name',cancel:'Cancel',save:'Save',statusReady:'CALCULATED',statusInvalid:'CHECK INPUT',statusPit:'PIT REQUIRED',statusImpossible:'CHECK STRATEGY',errLap:'Enter lap time as 1:48.500.',errDuration:'Race duration must be greater than zero.',errLaps:'Enter at least one lap.',errFuel:'Fuel per lap must be greater than zero.',errTank:'Tank capacity must be greater than zero.',errStart:'Starting fuel must be between zero and tank capacity.',errSafety:'Safety margin must be between 0 and 50%.',warnNoFuel:'Starting fuel is not enough for the planned race and refuelling is forbidden.',deficit:'Estimated fuel shortfall:',enough:'Starting fuel covers the estimate including safety margin.',impossibleMsg:'The race cannot be completed with these fuel settings.',noStints:'No stint plan available.',noLaps:'No lap data available.',needValid:'Valid inputs are required.',noProfiles:'No saved plans yet.',saveHint:'Use Save plan on the Calculator tab.',gameNone:'No game',trackNone:'No track',carNone:'No car',savedAt:'Saved',load:'Load',delete:'Delete',loaded:'Race plan loaded.',deleted:'Profile deleted.',saveError:'Could not save in browser storage.',fixErrors:'Fix the inputs before saving or exporting.',csvDone:'CSV downloaded.',resetConfirm:'Reset all fields to their default values?',resetDone:'Fields reset.',profileSaved:'Race plan saved.',fillName:'Enter a profile name first.',formation:'Formation',race:'Race',extraLap:'Extra lap',finish:'Finish',pit:'Pit',mandatoryPit:'Mandatory pit',planFuel:'Planned fuel',rawFuel:'Fuel before safety margin',fullTankRange:'Full-tank range',estimatedPitLoss:'Estimated pit time',simulatedLaps:'Simulated laps',seconds:'sec',minutes:'min',hours:'hr',lapsUnit:'laps',chartEmpty:'Enter valid values to see the chart.'};
const TR={language:'Dil',eyebrow:'SİM YARIŞI / YARIŞ MÜHENDİSLİĞİ',heroSub:"Yakıtını hesapla. Stint'lerini planla. Pit duvarında kontrol sende.",calculator:'Hesaplayıcı',savedProfiles:'Kayıtlı profiller',reset:'Sıfırla',savePlan:'Planı kaydet',raceInfo:'Yarış bilgileri',raceInfoSub:'Oyun, pist ve yarış formatı',game:'Oyun / simülatör',track:'Pist',car:'Araç / sınıf',raceName:'Yarış adı',raceFormat:'Yarış formatı',timeBased:'Süre bazlı',lapBased:'Tur bazlı',durationMin:'Yarış süresi (dk)',targetLaps:'Tur sayısı',lapTime:'Ortalama tur süresi',formationLaps:'Formasyon turu',extraLaps:'Ek tur',raceHelp:'Süre bazlı yarışta bitiş turu hesaplanır. Formasyon ve ek turlar ayrıca planlanır.',fuelTank:'Yakıt ve depo',fuelTankSub:'Tüketim ve başlangıç yakıtı',fuelPerLap:'Yakıt (L/tur)',tankCapacity:'Depo kapasitesi (L)',startFuel:'Start yakıtı (L)',safetyPct:'Güvenlik payı (%)',consumptionDelta:'Tüketim farkı (%)',formationPct:'Formasyon tüketimi (%)',fuelHelp:'Tüketim farkı hava, trafik veya sürüş stilini yaklaşık modeller.',pitRules:'Pit stop kuralları',pitRulesSub:'Yakıt ikmali ve zorunlu duruşlar',mandatoryStops:'Zorunlu pit sayısı',pitLoss:'Pit kaybı (sn)',refuelRate:'Yakıt dolum hızı (L/sn)',minPitTime:'Minimum pit süresi (sn)',tyreChange:'Lastik değişimi (sn)',refuelAllowed:'Yakıt ikmali',allowed:'Serbest',forbidden:'Yasak',includeFormationFuel:'Formasyon turlarını toplam yakıta dahil et',includeSafetyOnFormation:'Formasyon turlarına da güvenlik payı ekle',fuelTarget:'YAKIT HEDEFİ',fuelTargetSub:'Güvenlik payı dahil toplam planlama yakıtı',raceLaps:'Yarış turları',totalLaps:'Toplam tur',raceDurationOutLabel:'Yarış süresi',pitStops:'Pit stop',startCheck:'Başlangıç kontrolü',startCheckSub:'Start çizgisindeki yakıt durumu',tankFill:'Depo doluluğu',firstStint:'İlk stint',fuelDifference:'Yakıt açığı / fazlası',calculationNote:'Hesaplama notu',calculationNoteSub:'Sonuçları doğru yorumla',calculationNoteText:'Bu araç tahmini strateji üretir. Yarıştan önce kendi tüketim verin ve yarış kurallarıyla doğrula.',stintStrategy:'Stint ve pit stratejisi',stintStrategySub:'Önerilen yakıt aralıkları',exportCsv:'CSV indir',stint:'Stint',lapRange:'Tur aralığı',laps:'Tur',startingFuelCol:'Başlangıç yakıtı',consumption:'Tüketim',endingFuel:'Bitiş yakıtı',pitAction:'Pit işlemi',lapSimulation:'Tur tur yakıt simülasyonu',lapSimulationSub:'Her turun sonundaki tahmini yakıt seviyesi',lap:'Tur',lapType:'Tur tipi',fuelAfterLap:'Tur sonu yakıt',profilesSub:'Bu tarayıcıda saklanan yarış planları',profilesNote:'Profiller yalnızca bu tarayıcıda saklanır.',footer:'PIT DUVARI İÇİN TASARLANDI · V2.0',profileName:'Profil adı',cancel:'Vazgeç',save:'Kaydet',statusReady:'HESAPLANDI',statusInvalid:'GİRİŞİ KONTROL ET',statusPit:'PIT GEREKLİ',statusImpossible:'STRATEJİYİ KONTROL ET',errLap:'Tur süresini 1:48.500 biçiminde gir.',errDuration:'Yarış süresi sıfırdan büyük olmalı.',errLaps:'En az bir tur gir.',errFuel:'Tur başına yakıt tüketimi sıfırdan büyük olmalı.',errTank:'Depo kapasitesi sıfırdan büyük olmalı.',errStart:'Başlangıç yakıtı sıfır ile depo kapasitesi arasında olmalı.',errSafety:'Güvenlik payı %0 ile %50 arasında olmalı.',warnNoFuel:'Yakıt ikmali yasak ve başlangıç yakıtı yarış için yetersiz.',deficit:'Tahmini yakıt açığı:',enough:'Başlangıç yakıtı güvenlik payı dahil tahmini ihtiyacı karşılıyor.',impossibleMsg:'Bu yakıt ayarlarıyla yarış tamamlanamıyor.',noStints:'Stint planı yok.',noLaps:'Tur verisi yok.',needValid:'Geçerli girişler gerekli.',noProfiles:'Henüz kayıtlı plan yok.',saveHint:'Hesaplayıcı sekmesinden Planı kaydet seçeneğini kullan.',gameNone:'Oyun yok',trackNone:'Pist yok',carNone:'Araç yok',savedAt:'Kaydedildi',load:'Yükle',delete:'Sil',loaded:'Yarış planı yüklendi.',deleted:'Profil silindi.',saveError:'Tarayıcıya kaydedilemedi.',fixErrors:'Kaydetmeden veya dışa aktarmadan önce girişleri düzelt.',csvDone:'CSV indirildi.',resetConfirm:'Bütün alanlar varsayılan değerlere dönsün mü?',resetDone:'Alanlar sıfırlandı.',profileSaved:'Yarış planı kaydedildi.',fillName:'Önce profil adı gir.',formation:'Formasyon',race:'Yarış',extraLap:'Ek tur',finish:'Bitiş',pit:'Pit',mandatoryPit:'Zorunlu pit',planFuel:'Planlama yakıtı',rawFuel:'Güvenlik payı öncesi yakıt',fullTankRange:'Tam depo menzili',estimatedPitLoss:'Tahmini pit süresi',simulatedLaps:'Simüle edilen tur',seconds:'sn',minutes:'dk',hours:'sa',lapsUnit:'tur',chartEmpty:'Grafik için geçerli değerler gir.'};
const SHORT={de:{calculator:'Rechner',savedProfiles:'Gespeicherte Profile',reset:'Zurücksetzen',savePlan:'Plan speichern',raceInfo:'Renninformationen',game:'Spiel / Simulator',track:'Strecke',car:'Fahrzeug / Klasse',raceFormat:'Rennformat',timeBased:'Zeitbasiert',lapBased:'Rundenbasiert',durationMin:'Renndauer (Min.)',targetLaps:'Rundenanzahl',lapTime:'Durchschnittliche Rundenzeit',fuelTank:'Kraftstoff und Tank',fuelPerLap:'Kraftstoff (L/Runde)',tankCapacity:'Tankkapazität (L)',startFuel:'Startkraftstoff (L)',safetyPct:'Sicherheitspuffer (%)',pitRules:'Boxenstopp-Regeln',mandatoryStops:'Pflicht-Boxenstopps',refuelAllowed:'Tanken',allowed:'Erlaubt',forbidden:'Verboten',raceLaps:'Rennrunden',totalLaps:'Gesamtrunden',pitStops:'Boxenstopps',stintStrategy:'Stint- und Boxenstrategie',exportCsv:'CSV exportieren',lapSimulation:'Kraftstoffsimulation pro Runde',save:'Speichern',cancel:'Abbrechen',load:'Laden',delete:'Löschen'},fr:{calculator:'Calculateur',savedProfiles:'Profils enregistrés',reset:'Réinitialiser',savePlan:'Enregistrer le plan',raceInfo:'Informations de course',game:'Jeu / simulateur',track:'Circuit',car:'Voiture / catégorie',raceFormat:'Format de course',timeBased:'Durée',lapBased:'Tours',durationMin:'Durée (min)',targetLaps:'Nombre de tours',lapTime:'Temps moyen au tour',fuelTank:'Carburant et réservoir',fuelPerLap:'Carburant (L/tour)',tankCapacity:'Capacité du réservoir (L)',startFuel:'Carburant au départ (L)',safetyPct:'Marge de sécurité (%)',pitRules:'Règles des arrêts aux stands',mandatoryStops:'Arrêts obligatoires',refuelAllowed:'Ravitaillement',allowed:'Autorisé',forbidden:'Interdit',raceLaps:'Tours de course',totalLaps:'Tours au total',pitStops:'Arrêts aux stands',stintStrategy:'Stratégie de relais et d’arrêts',exportCsv:'Exporter CSV',lapSimulation:'Simulation tour par tour',save:'Enregistrer',cancel:'Annuler',load:'Charger',delete:'Supprimer'},es:{calculator:'Calculadora',savedProfiles:'Perfiles guardados',reset:'Restablecer',savePlan:'Guardar plan',raceInfo:'Información de carrera',game:'Juego / simulador',track:'Circuito',car:'Coche / clase',raceFormat:'Formato de carrera',timeBased:'Por tiempo',lapBased:'Por vueltas',durationMin:'Duración (min)',targetLaps:'Número de vueltas',lapTime:'Tiempo medio por vuelta',fuelTank:'Combustible y depósito',fuelPerLap:'Combustible (L/vuelta)',tankCapacity:'Capacidad del depósito (L)',startFuel:'Combustible inicial (L)',safetyPct:'Margen de seguridad (%)',pitRules:'Reglas de boxes',mandatoryStops:'Paradas obligatorias',refuelAllowed:'Repostaje',allowed:'Permitido',forbidden:'Prohibido',raceLaps:'Vueltas de carrera',totalLaps:'Vueltas totales',pitStops:'Paradas en boxes',stintStrategy:'Estrategia de stint y boxes',exportCsv:'Exportar CSV',lapSimulation:'Simulación vuelta a vuelta',save:'Guardar',cancel:'Cancelar',load:'Cargar',delete:'Eliminar'},it:{calculator:'Calcolatore',savedProfiles:'Profili salvati',reset:'Ripristina',savePlan:'Salva piano',raceInfo:'Informazioni gara',game:'Gioco / simulatore',track:'Circuito',car:'Auto / classe',raceFormat:'Formato gara',timeBased:'A tempo',lapBased:'A giri',durationMin:'Durata gara (min)',targetLaps:'Numero giri',lapTime:'Tempo medio sul giro',fuelTank:'Carburante e serbatoio',fuelPerLap:'Carburante (L/giro)',tankCapacity:'Capacità serbatoio (L)',startFuel:'Carburante iniziale (L)',safetyPct:'Margine di sicurezza (%)',pitRules:'Regole pit stop',mandatoryStops:'Pit stop obbligatori',refuelAllowed:'Rifornimento',allowed:'Consentito',forbidden:'Vietato',raceLaps:'Giri gara',totalLaps:'Giri totali',pitStops:'Pit stop',stintStrategy:'Strategia stint e pit',exportCsv:'Esporta CSV',lapSimulation:'Simulazione giro per giro',save:'Salva',cancel:'Annulla',load:'Carica',delete:'Elimina'},pt:{calculator:'Calculadora',savedProfiles:'Perfis guardados',reset:'Repor',savePlan:'Guardar plano',raceInfo:'Informações da corrida',game:'Jogo / simulador',track:'Pista',car:'Carro / classe',raceFormat:'Formato da corrida',timeBased:'Por tempo',lapBased:'Por voltas',durationMin:'Duração (min)',targetLaps:'Número de voltas',lapTime:'Tempo médio por volta',fuelTank:'Combustível e depósito',fuelPerLap:'Combustível (L/volta)',tankCapacity:'Capacidade do depósito (L)',startFuel:'Combustível inicial (L)',safetyPct:'Margem de segurança (%)',pitRules:'Regras das boxes',mandatoryStops:'Paragens obrigatórias',refuelAllowed:'Reabastecimento',allowed:'Permitido',forbidden:'Proibido',raceLaps:'Voltas de corrida',totalLaps:'Voltas totais',pitStops:'Paragens nas boxes',stintStrategy:'Estratégia de stint e boxes',exportCsv:'Exportar CSV',lapSimulation:'Simulação volta a volta',save:'Guardar',cancel:'Cancelar',load:'Carregar',delete:'Eliminar'},nl:{calculator:'Calculator',savedProfiles:'Opgeslagen profielen',reset:'Resetten',savePlan:'Plan opslaan',raceInfo:'Race-informatie',game:'Game / simulator',track:'Circuit',car:'Auto / klasse',raceFormat:'Raceformaat',timeBased:'Op tijd',lapBased:'Op ronden',durationMin:'Raceduur (min)',targetLaps:'Aantal ronden',lapTime:'Gemiddelde rondetijd',fuelTank:'Brandstof en tank',fuelPerLap:'Brandstof (L/ronde)',tankCapacity:'Tankinhoud (L)',startFuel:'Startbrandstof (L)',safetyPct:'Veiligheidsmarge (%)',pitRules:'Pitstopregels',mandatoryStops:'Verplichte pitstops',refuelAllowed:'Tanken',allowed:'Toegestaan',forbidden:'Verboden',raceLaps:'Raceronden',totalLaps:'Totaal ronden',pitStops:'Pitstops',stintStrategy:'Stint- en pitstrategie',exportCsv:'CSV exporteren',lapSimulation:'Brandstofsimulatie per ronde',save:'Opslaan',cancel:'Annuleren',load:'Laden',delete:'Verwijderen'},pl:{calculator:'Kalkulator',savedProfiles:'Zapisane profile',reset:'Resetuj',savePlan:'Zapisz plan',raceInfo:'Informacje o wyścigu',game:'Gra / symulator',track:'Tor',car:'Samochód / klasa',raceFormat:'Format wyścigu',timeBased:'Na czas',lapBased:'Na okrążenia',durationMin:'Czas wyścigu (min)',targetLaps:'Liczba okrążeń',lapTime:'Średni czas okrążenia',fuelTank:'Paliwo i zbiornik',fuelPerLap:'Paliwo (L/okrążenie)',tankCapacity:'Pojemność zbiornika (L)',startFuel:'Paliwo na starcie (L)',safetyPct:'Margines bezpieczeństwa (%)',pitRules:'Zasady pit stopów',mandatoryStops:'Obowiązkowe pit stopy',refuelAllowed:'Tankowanie',allowed:'Dozwolone',forbidden:'Zabronione',raceLaps:'Okrążenia wyścigu',totalLaps:'Łączna liczba okrążeń',pitStops:'Pit stopy',stintStrategy:'Strategia stintów i pit stopów',exportCsv:'Eksportuj CSV',lapSimulation:'Symulacja paliwa na okrążenie',save:'Zapisz',cancel:'Anuluj',load:'Wczytaj',delete:'Usuń'},ru:{calculator:'Калькулятор',savedProfiles:'Сохранённые профили',reset:'Сбросить',savePlan:'Сохранить план',raceInfo:'Информация о гонке',game:'Игра / симулятор',track:'Трасса',car:'Автомобиль / класс',raceFormat:'Формат гонки',timeBased:'По времени',lapBased:'По кругам',durationMin:'Длительность (мин)',targetLaps:'Число кругов',lapTime:'Среднее время круга',fuelTank:'Топливо и бак',fuelPerLap:'Топливо (л/круг)',tankCapacity:'Ёмкость бака (л)',startFuel:'Топливо на старте (л)',safetyPct:'Запас безопасности (%)',pitRules:'Правила пит-стопов',mandatoryStops:'Обязательные пит-стопы',refuelAllowed:'Заправка',allowed:'Разрешена',forbidden:'Запрещена',raceLaps:'Круги гонки',totalLaps:'Всего кругов',pitStops:'Пит-стопы',stintStrategy:'Стратегия отрезков и пит-стопов',exportCsv:'Экспорт CSV',lapSimulation:'Расход топлива по кругам',save:'Сохранить',cancel:'Отмена',load:'Загрузить',delete:'Удалить'},ja:{calculator:'計算機',savedProfiles:'保存済みプロファイル',reset:'リセット',savePlan:'プランを保存',raceInfo:'レース情報',game:'ゲーム / シミュレーター',track:'サーキット',car:'車 / クラス',raceFormat:'レース形式',timeBased:'時間制',lapBased:'周回数制',durationMin:'レース時間（分）',targetLaps:'周回数',lapTime:'平均ラップタイム',fuelTank:'燃料とタンク',fuelPerLap:'燃料（L/周）',tankCapacity:'タンク容量（L）',startFuel:'スタート燃料（L）',safetyPct:'安全マージン（%）',pitRules:'ピットストップ規則',mandatoryStops:'義務ピット回数',refuelAllowed:'給油',allowed:'許可',forbidden:'禁止',raceLaps:'レース周回数',totalLaps:'合計周回数',pitStops:'ピットストップ',stintStrategy:'スティントとピット戦略',exportCsv:'CSVを書き出す',lapSimulation:'周回ごとの燃料シミュレーション',save:'保存',cancel:'キャンセル',load:'読み込み',delete:'削除'},ko:{calculator:'계산기',savedProfiles:'저장된 프로필',reset:'초기화',savePlan:'계획 저장',raceInfo:'레이스 정보',game:'게임 / 시뮬레이터',track:'서킷',car:'차량 / 클래스',raceFormat:'레이스 형식',timeBased:'시간 기준',lapBased:'랩 기준',durationMin:'레이스 시간(분)',targetLaps:'랩 수',lapTime:'평균 랩 타임',fuelTank:'연료 및 탱크',fuelPerLap:'연료(L/랩)',tankCapacity:'탱크 용량(L)',startFuel:'출발 연료(L)',safetyPct:'안전 여유(%)',pitRules:'피트 스톱 규칙',mandatoryStops:'의무 피트 스톱',refuelAllowed:'급유',allowed:'허용',forbidden:'금지',raceLaps:'레이스 랩',totalLaps:'총 랩',pitStops:'피트 스톱',stintStrategy:'스틴트 및 피트 전략',exportCsv:'CSV 내보내기',lapSimulation:'랩별 연료 시뮬레이션',save:'저장',cancel:'취소',load:'불러오기',delete:'삭제'},zh:{calculator:'计算器',savedProfiles:'已保存的方案',reset:'重置',savePlan:'保存方案',raceInfo:'比赛信息',game:'游戏 / 模拟器',track:'赛道',car:'赛车 / 组别',raceFormat:'比赛形式',timeBased:'按时间',lapBased:'按圈数',durationMin:'比赛时长（分钟）',targetLaps:'圈数',lapTime:'平均单圈时间',fuelTank:'燃油与油箱',fuelPerLap:'燃油（升/圈）',tankCapacity:'油箱容量（升）',startFuel:'起步燃油（升）',safetyPct:'安全余量（%）',pitRules:'进站规则',mandatoryStops:'强制进站次数',refuelAllowed:'加油',allowed:'允许',forbidden:'禁止',raceLaps:'比赛圈数',totalLaps:'总圈数',pitStops:'进站次数',stintStrategy:'Stint 与进站策略',exportCsv:'导出 CSV',lapSimulation:'逐圈燃油模拟',save:'保存',cancel:'取消',load:'加载',delete:'删除'},ar:{calculator:'الحاسبة',savedProfiles:'الخطط المحفوظة',reset:'إعادة ضبط',savePlan:'حفظ الخطة',raceInfo:'معلومات السباق',game:'اللعبة / المحاكي',track:'الحلبة',car:'السيارة / الفئة',raceFormat:'نمط السباق',timeBased:'حسب الوقت',lapBased:'حسب اللفات',durationMin:'مدة السباق (دقيقة)',targetLaps:'عدد اللفات',lapTime:'متوسط زمن اللفة',fuelTank:'الوقود والخزان',fuelPerLap:'الوقود (لتر/لفة)',tankCapacity:'سعة الخزان (لتر)',startFuel:'وقود البداية (لتر)',safetyPct:'هامش الأمان (%)',pitRules:'قواعد التوقف',mandatoryStops:'التوقفات الإلزامية',refuelAllowed:'التزود بالوقود',allowed:'مسموح',forbidden:'ممنوع',raceLaps:'لفات السباق',totalLaps:'إجمالي اللفات',pitStops:'توقفات الصيانة',stintStrategy:'استراتيجية الفترات والتوقف',exportCsv:'تصدير CSV',lapSimulation:'محاكاة الوقود لكل لفة',save:'حفظ',cancel:'إلغاء',load:'تحميل',delete:'حذف'},hi:{calculator:'कैलकुलेटर',savedProfiles:'सहेजी गई प्रोफ़ाइल',reset:'रीसेट',savePlan:'योजना सहेजें',raceInfo:'रेस की जानकारी',game:'गेम / सिम्युलेटर',track:'ट्रैक',car:'कार / वर्ग',raceFormat:'रेस प्रारूप',timeBased:'समय आधारित',lapBased:'लैप आधारित',durationMin:'रेस अवधि (मिनट)',targetLaps:'लैप संख्या',lapTime:'औसत लैप समय',fuelTank:'ईंधन और टैंक',fuelPerLap:'ईंधन (लीटर/लैप)',tankCapacity:'टैंक क्षमता (लीटर)',startFuel:'शुरुआती ईंधन (लीटर)',safetyPct:'सुरक्षा मार्जिन (%)',pitRules:'पिट स्टॉप नियम',mandatoryStops:'अनिवार्य पिट स्टॉप',refuelAllowed:'ईंधन भरना',allowed:'अनुमति है',forbidden:'अनुमति नहीं',raceLaps:'रेस लैप',totalLaps:'कुल लैप',pitStops:'पिट स्टॉप',stintStrategy:'स्टिंट और पिट रणनीति',exportCsv:'CSV निर्यात',lapSimulation:'हर लैप का ईंधन सिमुलेशन',save:'सहेजें',cancel:'रद्द करें',load:'लोड करें',delete:'हटाएँ'}};
/* ---- V1.1 additional strings (other languages fall back to English) ---- */
Object.assign(EN,{raceHelp:'Timed races calculate the finish lap; pit time is subtracted from the race time. Formation and extra laps are planned separately.',pitPlan:'Pit plan',pitPlanSub:'Automatic or manual pit stops and fuel',pitMode:'Pit planning',pitAuto:'Automatic',pitManual:'Manual',pitAutoHelp:'Pit laps and fuel are calculated automatically: fewest stops that fit the tank, balanced stints, mandatory stops included.',pitManualHelp:'Enter the lap at the end of which you pit. Leave fuel empty to calculate the fuel needed to reach the next stop or the finish.',addPit:'Add pit stop',editManual:'Edit as manual plan',pitLapIn:'Pit lap',pitFuelAdd:'Fuel to add (L)',pitFuelAuto:'Auto',removePit:'Remove',pitStopsTable:'Pit stops',pitNo:'Pit',pitLapCol:'Pit lap',entryFuel:'Fuel in',fuelAdded:'Fuel added',exitFuel:'Fuel out',fillTime:'Fill time',pitTime:'Pit time',pitNote:'Note',noPits:'No pit stops planned.',noteAuto:'Auto',noteManual:'Manual',noteCapped:'Limited by tank',noteShort:'Stint does not fit the tank',finishFuel:'Fuel at finish',fuelShortfall:'Fuel shortfall',fuelDifference:'Total fuel balance',refuelTotal:'Total fuel added',estFinish:'Race time incl. pits',statusCheck:'CHECK PLAN',errRate:'Refuelling rate must be greater than zero.',errDelta:'Consumption change must be above −100%.',warnDry:'Fuel runs out on lap {lap}. Missing fuel: {l} L.',warnMargin:'Safety margin not covered: {l} L short across stints.',warnTankSmall:'Tank capacity is smaller than the fuel needed for one lap.',warnCapped:'Pit {n}: {req} L requested but the tank only has room for {add} L.',warnNoRefuel:'Refuelling is forbidden: manual fuel amounts are ignored.',warnMandatory:'Plan has {have} pit stops but {need} are mandatory.',warnPitRange:'Pit {n}: lap must be a whole number from 1 to {max}.',warnPitDup:'Pit {n}: lap {lap} is already used.',warnPitFuel:'Pit {n}: invalid fuel amount, auto value used.',planOk:'Plan covers the race including the safety margin. Fuel at finish: {l} L.',fuelOutIn:'in',fuelOutOut:'out'});
Object.assign(TR,{raceHelp:'Süre bazlı yarışta bitiş turu hesaplanır; pit süresi yarış süresinden düşülür. Formasyon ve ek turlar ayrıca planlanır.',pitPlan:'Pit planı',pitPlanSub:'Otomatik veya manuel pit stop ve yakıt',pitMode:'Pit planlama',pitAuto:'Otomatik',pitManual:'Manuel',pitAutoHelp:'Pit turları ve yakıt otomatik hesaplanır: depoya sığan en az pit, dengeli stintler, zorunlu pitler dahil.',pitManualHelp:'Hangi turun sonunda pite gireceğini yaz. Yakıtı boş bırakırsan sonraki pite veya bitişe yetecek yakıt otomatik hesaplanır.',addPit:'Pit stop ekle',editManual:'Manuel plana çevir',pitLapIn:'Pit turu',pitFuelAdd:'Alınacak yakıt (L)',pitFuelAuto:'Otomatik',removePit:'Sil',pitStopsTable:'Pit stoplar',pitNo:'Pit',pitLapCol:'Pit turu',entryFuel:'Giriş yakıtı',fuelAdded:'Alınan yakıt',exitFuel:'Çıkış yakıtı',fillTime:'Dolum süresi',pitTime:'Pit süresi',pitNote:'Not',noPits:'Planlı pit stop yok.',noteAuto:'Otomatik',noteManual:'Manuel',noteCapped:'Depo ile sınırlandı',noteShort:'Stint depoya sığmıyor',finishFuel:'Bitişte kalan yakıt',fuelShortfall:'Yakıt açığı',fuelDifference:'Toplam yakıt dengesi',refuelTotal:'Toplam alınan yakıt',estFinish:'Pit dahil yarış süresi',statusCheck:'PLANI KONTROL ET',errRate:'Yakıt dolum hızı sıfırdan büyük olmalı.',errDelta:'Tüketim farkı −%100 değerinden büyük olmalı.',warnDry:'Yakıt {lap}. turda bitiyor. Eksik yakıt: {l} L.',warnMargin:'Güvenlik payı karşılanmıyor: stintler genelinde {l} L eksik.',warnTankSmall:'Depo kapasitesi bir tur için gereken yakıttan küçük.',warnCapped:'Pit {n}: {req} L istendi ama depoda sadece {add} L yer var.',warnNoRefuel:'Yakıt ikmali yasak: manuel yakıt miktarları yok sayıldı.',warnMandatory:'Planda {have} pit var ama {need} pit zorunlu.',warnPitRange:'Pit {n}: tur 1 ile {max} arasında tam sayı olmalı.',warnPitDup:'Pit {n}: {lap}. tur zaten kullanılmış.',warnPitFuel:'Pit {n}: geçersiz yakıt miktarı, otomatik değer kullanıldı.',planOk:'Plan güvenlik payı dahil yarışı karşılıyor. Bitişte kalan yakıt: {l} L.',fuelOutIn:'giriş',fuelOutOut:'çıkış'});
const LANGS={en:EN,tr:TR,...SHORT};let lang='en',latest=null,timer,calcTimer,pitPlan=[];
function t(k,v){let s=(LANGS[lang]&&LANGS[lang][k])||EN[k]||k;if(v)s=s.replace(/\{(\w+)\}/g,(m,a)=>v[a]!==undefined?v[a]:m);return s}
function detect(){let s=localStorage.getItem(LANG_KEY);if(s&&s!=='auto'&&LANGS[s])return s;let b=(navigator.languages?.[0]||navigator.language||'en').split('-')[0].toLowerCase();return LANGS[b]?b:'en'}
function applyLang(v,save=true){lang=v==='auto'?detect():(LANGS[v]?v:'en');document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(e=>{let k=e.dataset.i18n;if(t(k)!==k)e.textContent=t(k)});if($('languageSelect').value!==v)$('languageSelect').value=v;if(save)localStorage.setItem(LANG_KEY,v);renderPitEditor();calculate();renderProfiles()}
const ids=['game','track','car','raceName','raceFormat','durationMin','targetLaps','lapTime','formationLaps','extraLaps','fuelPerLap','tankCapacity','startFuel','safetyPct','consumptionDelta','formationPct','mandatoryStops','pitLoss','refuelRate','minPitTime','tyreChange','refuelAllowed','includeFormationFuel','includeSafetyOnFormation','pitMode'];
function getData(){let d={};ids.forEach(id=>d[id]=$(id).type==='checkbox'?$(id).checked:$(id).value);d.pits=pitPlan.map(p=>({lap:p.lap,fuel:p.fuel}));return d}
function setData(d){ids.forEach(id=>{if(d[id]===undefined)return;if($(id).type==='checkbox')$(id).checked=!!d[id];else $(id).value=d[id]});pitPlan=Array.isArray(d.pits)?d.pits.map(p=>({lap:p.lap??'',fuel:p.fuel??''})):[];formatFields();renderPitEditor();calculate()}
function n(id){return Number($(id).value)}function fmt(v,d=1){return Number(v).toLocaleString(lang,{maximumFractionDigits:d,minimumFractionDigits:0})}function timeParse(v){v=String(v).trim().replace(',','.');if(/^\d+(\.\d+)?$/.test(v))return +v;let p=v.split(':');if(p.length===2&&p.every(x=>/^\d+(\.\d+)?$/.test(x)))return +p[0]*60 + +p[1];if(p.length===3&&p.every(x=>/^\d+(\.\d+)?$/.test(x)))return +p[0]*3600 + +p[1]*60 + +p[2];return NaN}function lapFmt(s){return `${Math.floor(s/60)}:${(s%60).toFixed(3).padStart(6,'0')}`}function dur(s){s=Math.round(s);let h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h} ${t('hours')} ${m} ${t('minutes')}`:`${m} ${t('minutes')} ${sec} ${t('seconds')}`}function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function formatFields(){$('durationMin').disabled=$('raceFormat').value!=='time';$('targetLaps').disabled=$('raceFormat').value==='time'}

/* ================= V1.1 calculation engine ================= */
function readParams(){
  const P={lapSec:timeParse($('lapTime').value),format:$('raceFormat').value,durationMin:n('durationMin'),target:Math.floor(n('targetLaps')),form:Math.max(0,Math.floor(n('formationLaps'))||0),extra:Math.max(0,Math.floor(n('extraLaps'))||0),base:n('fuelPerLap'),tank:n('tankCapacity'),start:n('startFuel'),safety:n('safetyPct'),delta:n('consumptionDelta'),formPct:Math.max(0,n('formationPct')||0),mandatory:Math.max(0,Math.floor(n('mandatoryStops'))||0),pitLoss:Math.max(0,n('pitLoss')||0),rate:Math.max(0,n('refuelRate')||0),minPit:Math.max(0,n('minPitTime')||0),tyres:Math.max(0,n('tyreChange')||0),allowed:$('refuelAllowed').value==='yes',include:$('includeFormationFuel').checked,safeForm:$('includeSafetyOnFormation').checked,mode:$('pitMode').value};
  const e=[];
  if(!Number.isFinite(P.lapSec)||P.lapSec<=0)e.push(t('errLap'));
  if(P.format==='time'&&!(P.durationMin>0))e.push(t('errDuration'));
  if(P.format==='laps'&&!(P.target>=1))e.push(t('errLaps'));
  if(!(P.base>0))e.push(t('errFuel'));
  if(!(P.delta>-100))e.push(t('errDelta'));
  if(!(P.tank>0))e.push(t('errTank'));
  if(!(P.start>=0&&P.start<=P.tank))e.push(t('errStart'));
  if(!(P.safety>=0&&P.safety<=50))e.push(t('errSafety'));
  if(P.allowed&&!(P.rate>0))e.push(t('errRate'));
  return {P,errors:e};
}
function buildLaps(P,raceLaps){
  const u=P.base*(1+P.delta/100),fu=u*P.formPct/100,m=1+P.safety/100,laps=[];
  for(let i=0;i<P.form;i++)laps.push({label:'F'+(i+1),type:'formation',no:0,use:P.include?fu:0,target:P.include?fu*(P.safeForm?m:1):0});
  for(let i=0;i<raceLaps+P.extra;i++)laps.push({label:String(i+1),type:i<raceLaps?'race':'extraLap',no:i+1,use:u,target:u*m});
  return laps;
}
function finalizePits(list){list.sort((a,b)=>a.lap-b.lap);list.forEach((p,k)=>p.next=k<list.length-1?list[k+1].lap:null);return list}
function cleanPits(rows,raceN,warns){
  const seen=new Set(),out=[];
  rows.forEach((r,i)=>{
    const raw=String(r.lap??'').trim();if(raw==='')return;
    const lap=Number(raw);
    if(!Number.isInteger(lap)||lap<1||lap>raceN-1){warns.push({k:'warnPitRange',v:{n:i+1,max:Math.max(1,raceN-1)}});return}
    if(seen.has(lap)){warns.push({k:'warnPitDup',v:{n:i+1,lap}});return}
    seen.add(lap);
    let f=null;const fr=String(r.fuel??'').trim();
    if(fr!==''){const x=Number(fr.replace(',','.'));if(Number.isFinite(x)&&x>=0)f=x;else warns.push({k:'warnPitFuel',v:{n:i+1}})}
    out.push({lap,fuel:f});
  });
  return finalizePits(out);
}
/* Fewest pit stops that fit the tank (or the mandatory count), stints balanced. */
function autoPits(P,laps,raceN){
  const m=1+P.safety/100,tl=P.base*(1+P.delta/100)*m;
  const formT=laps.slice(0,P.form).reduce((s,l)=>s+l.target,0);
  const first=Math.floor((P.start-formT)/tl+1e-9),full=Math.max(1,Math.floor(P.tank/tl+1e-9));
  let k;
  if(!P.allowed)k=P.mandatory;
  else{k=0;while(k<raceN-1&&Math.max(0,first)+k*full<raceN)k++;k=Math.max(k,P.mandatory)}
  k=Math.min(k,raceN-1);
  if(k<=0)return [];
  const even=Math.ceil(raceN/(k+1)),f=P.allowed?Math.min(even,Math.max(1,first)):even;
  const R=raceN-f,b=Math.floor(R/k),rem=R%k,pits=[];
  let lap=f;pits.push({lap,fuel:null});
  for(let j=0;j<k-1;j++){lap+=b+(j<rem?1:0);pits.push({lap,fuel:null})}
  return finalizePits(pits);
}
function simulate(P,laps,pits){
  const formN=P.form,warns=[],records=[],stints=[],pitRes=[];
  let fuel=P.start,dryLap=null,shortReal=0,tankSmall=false,pitSeconds=0,added=0,marginShort=0;
  const pitAt=new Map(pits.map(p=>[p.lap,p]));
  const newStint=(i,f)=>({number:stints.length+1,first:laps[i].label,startFuel:f,used:0,target:0,laps:0,raceLaps:0});
  let st=newStint(0,fuel);
  const closeStint=(i,endFuel,pit)=>{
    if(st.startFuel+1e-9<st.target)marginShort+=st.target-st.startFuel;
    stints.push({...st,last:laps[i].label,endFuel,pit});
  };
  for(let i=0;i<laps.length;i++){
    const l=laps[i];
    if(l.use>P.tank+1e-9)tankSmall=true;
    let short=0;
    if(fuel+1e-9<l.use){short=l.use-fuel;shortReal+=short;if(dryLap===null)dryLap=l.label;fuel=0}else fuel=Math.max(0,fuel-l.use);
    st.used+=l.use;st.target+=l.target;st.laps++;if(l.no>0)st.raceLaps++;
    const rec={label:l.label,type:l.type,use:l.use,dry:short>0,endFuel:fuel,pit:null};
    records.push(rec);
    const p=(l.no>0&&i<laps.length-1)?pitAt.get(l.no):null;
    if(p){
      const entry=fuel,nextIdx=p.next?formN+p.next-1:laps.length-1;
      let need=0;for(let j=i+1;j<=nextIdx;j++)need+=laps[j].target;
      const desired=Math.max(0,need-entry),cap=Math.max(0,P.tank-entry);
      let add=0,capped=false,insufficient=false;
      if(P.allowed){
        if(p.fuel!==null){add=Math.min(p.fuel,cap);capped=p.fuel>cap+1e-9}
        else{const d=Math.ceil(desired*10-1e-9)/10;add=Math.min(d,cap);insufficient=desired>cap+1e-9}
      }else if(p.fuel!==null&&p.fuel>0&&!warns.some(w=>w.k==='warnNoRefuel'))warns.push({k:'warnNoRefuel',v:{}});
      fuel=entry+add;added+=add;
      const fillSec=add>0?add/P.rate:0,stationary=Math.max(P.minPit,P.tyres+fillSec),pitSec=P.pitLoss+stationary;
      pitSeconds+=pitSec;
      const res={n:pitRes.length+1,lap:l.no,entry,add,exit:fuel,fillSec,stationary,pitSec,capped,insufficient,manual:p.fuel!==null,requested:p.fuel};
      pitRes.push(res);rec.pit=res;
      closeStint(i,entry,res);
      st=newStint(i+1,fuel);
    }
  }
  closeStint(laps.length-1,fuel,null);
  if(pits.length<P.mandatory)warns.push({k:'warnMandatory',v:{have:pits.length,need:P.mandatory}});
  return {records,stints,pitRes,pitSeconds,added,finishFuel:fuel,dryLap,shortReal,marginShort,tankSmall,warns};
}
function plan(P,raceLaps){
  const laps=buildLaps(P,raceLaps),raceN=raceLaps+P.extra,warns=[];
  const pits=P.mode==='manual'?cleanPits(pitPlan,raceN,warns):autoPits(P,laps,raceN);
  const sim=simulate(P,laps,pits);sim.warns=warns.concat(sim.warns);
  return {laps,pits,sim,raceLaps,raceN};
}
/* Timed races: time spent in the pits reduces the laps that can be driven. */
function solve(P){
  if(P.format!=='time')return plan(P,P.target);
  const D=P.durationMin*60,cache=new Map(),run=N=>{if(!cache.has(N))cache.set(N,plan(P,N));return cache.get(N)};
  let N=Math.max(1,Math.ceil(D/P.lapSec-1e-10));const seen=[];
  for(let k=0;k<10;k++){
    if(seen.includes(N))break;seen.push(N);
    const r=run(N),nx=Math.max(1,Math.ceil((D-r.sim.pitSeconds)/P.lapSec-1e-10));
    if(nx===N)return r;N=nx;
  }
  const cyc=seen.includes(N)?seen.slice(seen.indexOf(N)):[N];
  return run(Math.max(...cyc));
}
function calculate(){
  const {P,errors}=readParams();
  if(errors.length){latest=null;invalid(errors);return}
  lastErrors=[];
  const r=solve(P);
  const sig=r.sim.pitRes.map(p=>p.lap+':'+Math.round(p.add)).join('|');
  if(engPrevSig!==null&&sig!==engPrevSig){engFlashUntil=Date.now()+6000;clearTimeout(engFlashTimer);engFlashTimer=setTimeout(engineerUpdate,6100)}
  engPrevSig=sig;
  latest={P,...r,needed:r.laps.reduce((s,l)=>s+l.target,0),raw:r.laps.reduce((s,l)=>s+l.use,0)};
  render();
}
function invalid(err){
  lastErrors=err;
  $('statusPill').textContent=t('statusInvalid');$('statusPill').classList.add('warning');$('recommendedFuel').textContent='—';
  ['raceLapsOut','totalLapsOut','raceDurationOut','pitCountOut','finishFuelOut','shortfallOut'].forEach(id=>$(id).textContent='—');
  $('stintTable').innerHTML=`<tr><td colspan="7">${err.map(esc).join(' ')}</td></tr>`;
  $('pitTable').innerHTML=`<tr><td colspan="9">${esc(t('needValid'))}</td></tr>`;
  $('lapTable').innerHTML=`<tr><td colspan="6">${esc(t('needValid'))}</td></tr>`;
  $('alertBox').innerHTML=err.map(x=>`<div>${esc(x)}</div>`).join('');$('alertBox').classList.remove('hidden','ok');$('alertBox').classList.add('error');
  $('strategySummary').innerHTML='';drawChart([]);engineerUpdate();
}
function alerts(a){
  const s=a.sim,P=a.P,out=[];
  if(s.dryLap!==null)out.push({e:1,m:t('warnDry',{lap:s.dryLap,l:fmt(Math.max(s.shortReal,0.1))})});
  if(s.tankSmall)out.push({e:1,m:t('warnTankSmall')});
  if(s.dryLap===null&&s.marginShort>1e-6)out.push({e:0,m:t('warnMargin',{l:fmt(s.marginShort)})});
  s.pitRes.filter(p=>p.capped).forEach(p=>out.push({e:0,m:t('warnCapped',{n:p.n,req:fmt(p.requested),add:fmt(p.add)})}));
  s.warns.forEach(w=>out.push({e:0,m:t(w.k,w.v)}));
  if(!out.length)out.push({e:0,ok:1,m:t('planOk',{l:fmt(s.finishFuel)})});
  return out;
}
function render(){
  const a=latest,P=a.P,s=a.sim;
  $('recommendedFuel').textContent=fmt(a.needed);$('raceLapsOut').textContent=a.raceLaps;$('totalLapsOut').textContent=a.laps.length;
  $('raceDurationOut').textContent=dur(a.raceLaps*P.lapSec);$('pitCountOut').textContent=s.pitRes.length;
  const ratio=Math.min(100,Math.max(0,P.start/P.tank*100)),balance=P.start+s.added-a.needed,short=s.dryLap!==null?s.shortReal:s.marginShort;
  $('startRatioText').textContent=`${fmt(ratio,0)}%`;$('startRatioBar').style.width=ratio+'%';
  $('tankFillOut').textContent=`${fmt(P.start)} / ${fmt(P.tank)} L`;
  $('firstStintOut').textContent=`${s.stints[0].raceLaps} ${t('lapsUnit')}`;
  $('finishFuelOut').textContent=`${fmt(s.finishFuel,2)} L`;$('finishFuelOut').className=s.dryLap!==null||s.finishFuel<1e-6?'fuel-low':'fuel-ok';
  $('shortfallOut').textContent=`${fmt(short)} L`;$('shortfallOut').className=short>1e-6?'fuel-low':'fuel-ok';
  $('fuelDifferenceOut').textContent=`${balance>=-1e-9?'+':'−'}${fmt(Math.abs(balance))} L`;$('fuelDifferenceOut').className=balance>=-1e-9?'fuel-ok':'fuel-low';
  const al=alerts(a),hasErr=al.some(x=>x.e),hasWarn=al.some(x=>!x.ok&&!x.e),bad=hasErr;
  $('statusPill').textContent=bad?t('statusImpossible'):hasWarn||s.marginShort>1e-6?t('statusCheck'):(s.pitRes.length?t('statusPit'):t('statusReady'));
  $('statusPill').classList.toggle('warning',bad||hasWarn||s.marginShort>1e-6);
  const box=$('alertBox');box.innerHTML=al.map(x=>`<div>${esc(x.m)}</div>`).join('');box.classList.remove('hidden');box.classList.toggle('error',bad);box.classList.toggle('ok',al.length===1&&!!al[0].ok);
  $('stintTable').innerHTML=s.stints.map(x=>`<tr><td>${x.number}</td><td>${esc(x.first)}–${esc(x.last)}</td><td>${x.laps}</td><td>${fmt(x.startFuel)} L</td><td>${fmt(x.used)} L</td><td class="${x.endFuel<1e-6?'fuel-low':''}">${fmt(x.endFuel)} L</td><td>${x.pit?`${esc(t('pit'))} +${fmt(x.pit.add)} L`:esc(t('finish'))}</td></tr>`).join('');
  $('pitTable').innerHTML=s.pitRes.length?s.pitRes.map(p=>{
    const note=p.capped?t('noteCapped'):p.insufficient?t('noteShort'):p.manual?t('noteManual'):t('noteAuto'),bad=p.capped||p.insufficient;
    return `<tr><td>${p.n}</td><td>${p.lap}</td><td>${fmt(p.entry)} L</td><td>+${fmt(p.add)} L</td><td>${fmt(p.exit)} L</td><td>${fmt(p.fillSec)} ${t('seconds')}</td><td>${fmt(p.pitSec)} ${t('seconds')}</td><td class="${bad?'fuel-low':''}">${esc(note)}</td></tr>`}).join(''):`<tr><td colspan="8">${esc(t('noPits'))}</td></tr>`;
  $('lapTable').innerHTML=s.records.map(r=>{
    const act=r.pit?`${esc(t('pit'))}: ${fmt(r.pit.entry)} → +${fmt(r.pit.add)} → ${fmt(r.pit.exit)} L`:'—';
    return `<tr class="${r.pit?'pit-hl':''}"><td>${esc(r.label)}</td><td>${esc(t(r.type))}</td><td>${lapFmt(P.lapSec)}</td><td>${fmt(r.use,2)} L</td><td>${act}</td><td class="${r.dry||r.endFuel<1?'fuel-low':'fuel-ok'}">${fmt(r.endFuel,2)} L</td></tr>`}).join('');
  const perLap=P.base*(1+P.delta/100)*(1+P.safety/100);
  const items=[[t('planFuel'),`${fmt(a.needed)} L`],[t('rawFuel'),`${fmt(a.raw)} L`],[t('fullTankRange'),`${Math.floor(P.tank/Math.max(.001,perLap))} ${t('lapsUnit')}`],[t('refuelTotal'),`${fmt(s.added)} L`],[t('estimatedPitLoss'),dur(s.pitSeconds)],[t('estFinish'),dur((a.raceN)*P.lapSec+s.pitSeconds)]];
  $('strategySummary').innerHTML=items.map(([l,v])=>`<div class="chip"><span>${esc(l)}</span><strong>${esc(v)}</strong></div>`).join('');
  drawChart(s.records);engineerUpdate();
}
function drawChart(rows){
  let c=$('fuelChart'),ctx=c.getContext('2d'),w=Math.max(280,c.clientWidth||600),h=180,dpr=devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  let left=40,right=12,top=12,bottom=28,pw=w-left-right,ph=h-top-bottom,max=Math.max(n('tankCapacity')||1,...rows.map(r=>r.pit?r.pit.exit:0),...rows.map(r=>r.endFuel),1);
  ctx.font='10px sans-serif';ctx.strokeStyle='#30363b';ctx.fillStyle='#929aa1';
  for(let i=0;i<=4;i++){let y=top+ph*i/4;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(w-right,y);ctx.stroke();ctx.fillText(fmt(max*(1-i/4),0),3,y+3)}
  if(!rows.length){ctx.fillText(t('chartEmpty'),left,top+ph/2);return}
  const x=i=>left+(rows.length===1?pw/2:i/(rows.length-1)*pw),y=v=>top+ph-v/max*ph;
  const pts=[];rows.forEach((r,i)=>{pts.push([i,r.endFuel]);if(r.pit)pts.push([i,r.pit.exit])});
  ctx.beginPath();pts.forEach(([i,v],k)=>k?ctx.lineTo(x(i),y(v)):ctx.moveTo(x(i),y(v)));ctx.strokeStyle='#ff6b2c';ctx.lineWidth=2.5;ctx.stroke();
  ctx.lineTo(x(rows.length-1),top+ph);ctx.lineTo(x(0),top+ph);ctx.closePath();
  let g=ctx.createLinearGradient(0,top,0,top+ph);g.addColorStop(0,'#ff6b2c35');g.addColorStop(1,'#ff6b2c00');ctx.fillStyle=g;ctx.fill();
  ctx.setLineDash([3,3]);ctx.strokeStyle='#8ed7a6';ctx.lineWidth=1;rows.forEach((r,i)=>{if(r.pit){ctx.beginPath();ctx.moveTo(x(i),top);ctx.lineTo(x(i),top+ph);ctx.stroke()}});ctx.setLineDash([]);
  rows.forEach((r,i)=>{if(r.dry){ctx.fillStyle='#ff7777';ctx.beginPath();ctx.arc(x(i),y(0),3.5,0,7);ctx.fill()}});
  let marks=Math.min(5,rows.length);for(let i=0;i<marks;i++){let ix=Math.round(i*(rows.length-1)/Math.max(1,marks-1));ctx.fillStyle='#929aa1';ctx.fillText(`L${rows[ix].label}`,x(ix)-8,h-7)}
}

/* ================= pit editor ================= */
function renderPitEditor(){
  const box=$('pitEditor');
  if($('pitMode').value==='auto'){box.innerHTML=`<p class="help">${esc(t('pitAutoHelp'))}</p><button type="button" class="btn btn-outline" data-act="toManual">${esc(t('editManual'))}</button>`;return}
  box.innerHTML=`<p class="help">${esc(t('pitManualHelp'))}</p><div class="pit-rows">${pitPlan.map((p,i)=>`<div class="pit-row"><span class="pit-no">#${i+1}</span><label><span>${esc(t('pitLapIn'))}</span><input type="number" min="1" step="1" inputmode="numeric" data-pit="lap" data-i="${i}" value="${esc(p.lap)}"></label><label><span>${esc(t('pitFuelAdd'))}</span><input type="number" min="0" step=".1" inputmode="decimal" data-pit="fuel" data-i="${i}" value="${esc(p.fuel)}" placeholder="${esc(t('pitFuelAuto'))}"></label><button type="button" class="btn btn-secondary" data-act="del" data-i="${i}" aria-label="${esc(t('removePit'))}">✕</button></div>`).join('')}</div><button type="button" class="btn btn-outline" data-act="add">+ ${esc(t('addPit'))}</button>`;
}
$('pitEditor').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b)return;const act=b.dataset.act;
  if(act==='add'){pitPlan.push({lap:'',fuel:''});renderPitEditor();const ins=$('pitEditor').querySelectorAll('[data-pit="lap"]');ins[ins.length-1]?.focus();calculate()}
  else if(act==='del'){pitPlan.splice(+b.dataset.i,1);renderPitEditor();calculate()}
  else if(act==='toManual'){pitPlan=latest?latest.pits.map(p=>({lap:p.lap,fuel:''})):[];$('pitMode').value='manual';renderPitEditor();calculate()}
});

/* ================= profiles / export / events ================= */
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||'[]')}catch{return []}}function updateCount(){$('savedCount').textContent=profiles().length}function saveProfiles(a){try{localStorage.setItem(PROFILE_KEY,JSON.stringify(a));updateCount();return true}catch{toast(t('saveError'));return false}}function renderProfiles(){let p=profiles();updateCount();$('savedProfiles').innerHTML=p.length?p.map(x=>`<article class="profile-card"><h3>${esc(x.name)}</h3><p>${esc(x.data.game||t('gameNone'))} · ${esc(x.data.track||t('trackNone'))} · ${esc(x.data.car||t('carNone'))}</p><p>${t('savedAt')}: ${esc(x.savedAt)}</p><div class="profile-actions"><button class="btn btn-outline" data-load="${esc(x.id)}">${t('load')}</button><button class="btn btn-secondary" data-delete="${esc(x.id)}">${t('delete')}</button></div></article>`).join(''):`<div class="empty-profiles">${t('noProfiles')}<br>${t('saveHint')}</div>`;$('savedProfiles').querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{let p=profiles().find(x=>x.id===b.dataset.load);if(p){setData(p.data);switchTab('calculator');toast(t('loaded'))}});$('savedProfiles').querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{saveProfiles(profiles().filter(x=>x.id!==b.dataset.delete));renderProfiles();toast(t('deleted'))})}function switchTab(tab){let calc=tab==='calculator';$('calculatorView').classList.toggle('hidden',!calc);$('profilesView').classList.toggle('hidden',calc);document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));if(!calc)renderProfiles();else drawChart(latest?.sim.records||[])}function toast(s){let el=$('toast');el.textContent=s;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),2500)}
function exportCSV(){
  if(!latest){toast(t('fixErrors'));return}
  const s=latest.sim,P=latest.P;
  const rows=[[t('lap'),t('lapType'),'Lap time (sec)',t('consumption'),t('pitAction'),t('fuelAfterLap'),t('exitFuel')],
    ...s.records.map(r=>[r.label,t(r.type),P.lapSec,r.use,r.pit?`${t('pit')} +${r.pit.add}`:'—',r.endFuel,r.pit?r.pit.exit:'']),
    [],[t('pitStopsTable')],[t('pitNo'),t('pitLapCol'),t('entryFuel'),t('fuelAdded'),t('exitFuel'),t('fillTime'),t('pitTime')],
    ...s.pitRes.map(p=>[p.n,p.lap,p.entry,p.add,p.exit,p.fillSec,p.pitSec]),
    [],[t('raceLaps'),latest.raceLaps],[t('planFuel'),latest.needed],[t('pitStops'),s.pitRes.length],[t('finishFuel'),s.finishFuel],[t('fuelShortfall'),(s.dryLap!==null?s.shortReal:s.marginShort)]];
  const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(';')).join('\r\n'),blob=new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='apex-fuel-strategy.csv';a.click();URL.revokeObjectURL(url);toast(t('csvDone'));
}
$('languageSelect').addEventListener('change',e=>applyLang(e.target.value));
$('raceForm').addEventListener('input',e=>{const el=e.target;if(el.dataset&&el.dataset.pit!==undefined&&pitPlan[+el.dataset.i])pitPlan[+el.dataset.i][el.dataset.pit]=el.value;clearTimeout(calcTimer);calcTimer=setTimeout(calculate,100)});
$('raceForm').addEventListener('change',e=>{if(e.target.id==='pitMode')renderPitEditor();formatFields();calculate()});
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
$('resetBtn').onclick=()=>{if(confirm(t('resetConfirm'))){$('raceForm').reset();pitPlan=[];formatFields();renderPitEditor();calculate();toast(t('resetDone'))}};
$('saveBtn').onclick=()=>{if(!latest){toast(t('fixErrors'));return}$('profileName').value=$('raceName').value.trim()||`${$('track').value.trim()||'Race'} - ${$('durationMin').value} min`;$('saveDialog').showModal()};
function closeDialog(){$('saveDialog').close()}$('closeDialog').onclick=closeDialog;$('cancelSave').onclick=closeDialog;
$('saveForm').addEventListener('submit',e=>{e.preventDefault();let name=$('profileName').value.trim();if(!name){toast(t('fillName'));return}let list=profiles();list.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name,data:getData(),savedAt:new Date().toLocaleString(lang)});if(saveProfiles(list.slice(0,100))){closeDialog();renderProfiles();toast(t('profileSaved'))}});
$('exportBtn').onclick=exportCSV;window.addEventListener('resize',()=>drawChart(latest?.sim.records||[]));
/* ================= V1.2 race engineer ================= */
Object.assign(EN,{engTagReady:'PLAN READY',engTagRace:'READY TO RACE',engTagPit:'PIT ORDER',engTagNext:'NEXT PIT',engTagExit:'PIT EXIT',engTagFinal:'FINAL STINT',engTagWarn:'FUEL WARNING',engTagCrit:'FUEL ALERT',engTagUpd:'STRATEGY UPDATED',engTagFin:'FINISHED',engTagInput:'CHECK INPUT',
engMReady:'First pit: lap {lap}. Add {add} L.',engMRace:'No pit stop needed. Estimated fuel at finish: {l} L.',engMPit:'Pit at the end of this lap (lap {lap}) and add {add} L.',engMPitNext:'Pit lap is next (lap {lap}). Add {add} L.',engMAhead:'Pit in {n} laps (lap {lap}). Add {add} L.',engMExit:'Pit exit. Target fuel: {l} L.',engMFinal:'Fuel needed to the finish: {l} L.',engMDry:'At this consumption you may not reach the finish: fuel runs out on lap {lap}.',engMUpd:'New next pit: lap {lap}. Add {add} L.',engMUpdNone:'The new plan needs no further pit stop.',engMFin:'Race complete.',engRaw:'{m}',engInput:'{e}',
engSub:'Fuel at finish: {l} L · Pit stops: {p}',engSubLast:'Last pit: lap {lap} · Final stint needs {x} L',engSubTank:'Planned fuel in tank: {l} L',
engNextPit:'Next pit lap',engLapsToPit:'Laps to pit',engFuelAdd:'Fuel to add',engInTank:'Planned in tank',engCurLap:'Current lap',engLapPlus:'+1 lap',engPre:'Pre-race',engDetails:'Details',engSound:'Sound alerts',engSugTitle:'Suggestions',engChecklist:'Pre-race checklist',engLog:'Engineer log',engClearLog:'Clear',engNoLog:'No messages yet.',engNoSug:'No problems found.',engLapHelp:'Update the lap manually: the app cannot read live data from the simulator.',
chkFuel:'Fuel covers the race with safety margin',chkTank:'Every stint fits the tank',chkMand:'Mandatory pit stops satisfied',chkPlan:'Pit plan entries are valid',
sugPitBy:'Pit no later than lap {lap}.',sugAddFuel:'Pit {n}: add {x} L instead of {cur} L (tank room: {max} L).',sugStart:'Start with {x} L more fuel (tank room: {max} L).',sugAuto:'Automatic plan that fits: {plan}.',sugSave:'Save about {p}% fuel per lap (≤ {c} L/lap) with lift-and-coast.',sugNoPit:'no pit stop'});
Object.assign(TR,{engTagReady:'PLAN HAZIR',engTagRace:'YARIŞA HAZIR',engTagPit:'PİT TALİMATI',engTagNext:'SIRADAKİ PİT',engTagExit:'PİT ÇIKIŞI',engTagFinal:'SON STINT',engTagWarn:'YAKIT UYARISI',engTagCrit:'YAKIT ALARMI',engTagUpd:'STRATEJİ GÜNCELLENDİ',engTagFin:'BİTTİ',engTagInput:'GİRİŞİ KONTROL ET',
engMReady:'İlk pit turu: {lap}. tur. {add} L yakıt al.',engMRace:'Pit gerekmiyor. Tahmini bitiş yakıtı: {l} L.',engMPit:'Bu turun sonunda ({lap}. tur) pite gir ve {add} L yakıt al.',engMPitNext:'Pit turu bir sonraki tur ({lap}. tur). {add} L yakıt al.',engMAhead:'Pite {n} tur var ({lap}. tur). {add} L yakıt al.',engMExit:'Pit çıkışı. Hedef yakıt: {l} L.',engMFinal:'Bitişe kadar gereken yakıt: {l} L.',engMDry:'Bu tüketimle bitişe ulaşamayabilirsin: yakıt {lap}. turda bitiyor.',engMUpd:'Yeni pit turu: {lap}. tur. {add} L yakıt al.',engMUpdNone:'Yeni planda başka pit gerekmiyor.',engMFin:'Yarış tamamlandı.',
engSub:'Bitişte yakıt: {l} L · Pit sayısı: {p}',engSubLast:'Son pit: {lap}. tur · Son stint için gereken yakıt: {x} L',engSubTank:'Tankta planlanan yakıt: {l} L',
engNextPit:'Sıradaki pit turu',engLapsToPit:'Pite kalan tur',engFuelAdd:'Alınacak yakıt',engInTank:'Planlanan tank',engCurLap:'Mevcut tur',engLapPlus:'+1 tur',engPre:'Yarış öncesi',engDetails:'Detaylar',engSound:'Sesli uyarı',engSugTitle:'Öneriler',engChecklist:'Yarış öncesi kontrol',engLog:'Mühendis kaydı',engClearLog:'Temizle',engNoLog:'Henüz mesaj yok.',engNoSug:'Sorun bulunamadı.',engLapHelp:'Turu elle güncelle: uygulama simülatörden canlı veri okuyamaz.',
chkFuel:'Yakıt güvenlik payıyla yarışı karşılıyor',chkTank:'Her stint depoya sığıyor',chkMand:'Zorunlu pitler sağlanıyor',chkPlan:'Pit planı girişleri geçerli',
sugPitBy:'En geç {lap}. turda pite gir.',sugAddFuel:'Pit {n}: {cur} L yerine {x} L yakıt al (depoda boşluk: {max} L).',sugStart:'Start yakıtını {x} L artır (depoda boşluk: {max} L).',sugAuto:'Sığan otomatik plan: {plan}.',sugSave:'Tur başına yaklaşık %{p} yakıt tasarrufu yap (≤ {c} L/tur).',sugNoPit:'pit yok'});
let lastErrors=[],curLap=0,eng={sound:false,vol:.6,collapsed:false,more:false},engLog=[],engPrevSig=null,engFlashUntil=0,engSeen=null,engLogged=null,engTimer,engFlashTimer,actx;
const ENG_KEY='apexEngineer.v1',LOG_KEY='apexEngineerLog.v1';
try{const s=JSON.parse(localStorage.getItem(ENG_KEY)||'{}');eng.sound=!!s.sound;eng.collapsed=s.collapsed===undefined?innerWidth<760:!!s.collapsed;if(typeof s.vol==='number')eng.vol=Math.min(1,Math.max(0,s.vol));if(s.lap>0&&Date.now()-s.lapAt<6*3600e3)curLap=Math.floor(s.lap);engLog=JSON.parse(localStorage.getItem(LOG_KEY)||'[]')}catch{}
function engSave(){try{localStorage.setItem(ENG_KEY,JSON.stringify({sound:eng.sound,vol:eng.vol,collapsed:eng.collapsed,lap:curLap,lapAt:Date.now()}))}catch{}}
function tone(f,t0,d,v){const o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.01);g.gain.linearRampToValueAtTime(0,t0+d);o.connect(g);g.connect(actx.destination);o.start(t0);o.stop(t0+d+.02)}
function playAlert(sev,force){
  if(!eng.sound&&!force)return;
  try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();actx.resume();const s=actx.currentTime+.02,v=eng.vol*.6;
    if(sev==='crit')[0,.22,.44].forEach(o=>tone(1000,s+o,.14,v));else if(sev==='pit')[0,.3].forEach(o=>tone(760,s+o,.2,v));else if(sev==='warn')tone(520,s,.45,v)}catch{}
}
function nextPitFor(a,cur){return cur<=0?a.sim.pitRes[0]:a.sim.pitRes.find(p=>p.lap>=cur)}
function planOk(sim){return sim.dryLap===null&&sim.marginShort<=1e-6&&!sim.tankSmall&&!sim.pitRes.some(p=>p.capped||p.insufficient)}
function suggestions(a){
  const s=a.sim,P=a.P,out=[];if(planOk(s))return out;
  const di=s.records.findIndex(r=>r.dry),dryNo=di>=0?a.laps[di].no:0;
  if(P.allowed&&dryNo>1)out.push({k:'sugPitBy',v:{lap:dryNo-1}});
  if(P.allowed){
    const st0=s.stints[0],room0=P.tank-P.start,x0=st0.target-st0.startFuel;
    if(x0>1e-6&&x0<=room0+1e-9)out.push({k:'sugStart',v:{x:fmt(Math.ceil(x0*10)/10),max:fmt(room0)}});
    s.stints.forEach((st,i)=>{const pit=i>0?s.stints[i-1].pit:null;if(!pit)return;const sh=st.target-st.startFuel,room=P.tank-pit.entry;if(sh>1e-6&&pit.add+sh<=room+1e-9)out.push({k:'sugAddFuel',v:{n:pit.n,x:fmt(Math.ceil((pit.add+sh)*10)/10),cur:fmt(pit.add),max:fmt(room)}})});
    if(P.mode==='manual'){const r=plan({...P,mode:'auto'},a.raceLaps);if(planOk(r.sim))out.push({k:'sugAuto',v:{plan:r.sim.pitRes.length?r.sim.pitRes.map(p=>`${p.lap} (+${fmt(p.add)} L)`).join(', '):t('sugNoPit')}})}
  }
  const sh=Math.max(s.marginShort,s.shortReal);
  if(sh>1e-6){const pct=Math.max(1,Math.ceil(sh/a.needed*100));out.push({k:'sugSave',v:{p:pct,c:fmt(P.base*(1+P.delta/100)*(1-pct/100),2)}})}
  return out.slice(0,5);
}
function checklist(a){const s=a.sim,P=a.P;return [{ok:s.dryLap===null&&s.marginShort<=1e-6&&!s.tankSmall,k:'chkFuel'},{ok:!s.pitRes.some(p=>p.capped||p.insufficient),k:'chkTank'},{ok:s.pitRes.length>=P.mandatory,k:'chkMand'},{ok:!s.warns.some(w=>/^warnPit/.test(w.k)),k:'chkPlan'}]}
function engineerState(){
  if(!latest)return {sev:'warn',tag:'engTagInput',msg:'engInput',v:{e:lastErrors[0]||''},sub:'',stats:{},sug:[],chk:[]};
  const a=latest,s=a.sim,P=a.P,raceN=a.raceN,cur=Math.min(Math.max(curLap,0),raceN+1),problems=alerts(a).filter(x=>!x.ok);
  const dry=s.dryLap!==null,up=cur>raceN?null:nextPitFor(a,cur),lapsTo=up?(cur<=0?up.lap:up.lap-cur):null;
  const idx=P.form+Math.max(cur,1)-1,rem=a.laps.slice(Math.min(idx,a.laps.length)).reduce((q,l)=>q+l.target,0);
  const pr=idx>0?s.records[Math.min(idx,s.records.length)-1]:null,prev=cur<=0||!pr?P.start:(pr.pit?pr.pit.exit:pr.endFuel);
  const sug=suggestions(a),chk=checklist(a),flash=Date.now()<engFlashUntil;
  let sev,tag,msg,v={};
  if(cur>raceN){sev='ok';tag='engTagFin';msg='engMFin'}
  else if(dry){sev='crit';tag='engTagCrit';msg='engMDry';v={lap:s.dryLap}}
  else if(cur>0&&up&&lapsTo<=1){sev='pit';tag='engTagPit';msg=lapsTo===0?'engMPit':'engMPitNext';v={lap:up.lap,add:fmt(up.add)}}
  else if(problems.length){sev='warn';tag='engTagWarn';msg='engRaw';v={m:problems[0].m}}
  else if(flash){sev='info';tag='engTagUpd';const f=up||s.pitRes[0];msg=f?'engMUpd':'engMUpdNone';v=f?{lap:f.lap,add:fmt(f.add)}:{}}
  else if(cur>1&&s.pitRes.some(p=>p.lap===cur-1)){sev='info';tag='engTagExit';msg='engMExit';v={l:fmt(prev)}}
  else if(up&&cur===0){sev='ok';tag='engTagReady';msg='engMReady';v={lap:up.lap,add:fmt(up.add)}}
  else if(up){sev='info';tag='engTagNext';msg='engMAhead';v={n:lapsTo,lap:up.lap,add:fmt(up.add)}}
  else if(cur===0){sev='ok';tag='engTagRace';msg='engMRace';v={l:fmt(s.finishFuel)}}
  else{sev='info';tag='engTagFinal';msg='engMFinal';v={l:fmt(rem)}}
  const last=s.pitRes[s.pitRes.length-1];
  let sub=t('engSub',{l:fmt(s.finishFuel),p:s.pitRes.length});
  if(last&&cur===0)sub+=' · '+t('engSubLast',{lap:last.lap,x:fmt(s.stints[s.stints.length-1].target)});
  if(cur>0&&cur<=raceN)sub+=' · '+t('engSubTank',{l:fmt(prev)});
  if(sev==='crit'&&sug[0])sub=t(sug[0].k,sug[0].v);
  return {sev,tag,msg,v,sub,sug,chk,cur,stats:{nextLap:up?up.lap:null,lapsTo,add:up?up.add:null,tank:cur>0&&cur<=raceN?prev:P.start}};
}
function engineerUpdate(){
  const st=engineerState(),box=$('engineer');
  box.dataset.sev=st.sev;$('engTag').textContent=t(st.tag);$('engMsg').textContent=t(st.msg,st.v);$('engSub').textContent=st.sub;
  const S=st.stats;$('engNextLap').textContent=S.nextLap??'—';$('engLapsTo').textContent=S.lapsTo??'—';$('engAdd').textContent=S.add!=null?`${fmt(S.add)} L`:'—';$('engTank').textContent=S.tank!=null?`${fmt(S.tank)} L`:'—';
  if(document.activeElement!==$('engLap'))$('engLap').value=curLap;
  $('engSug').innerHTML=st.sug.length?st.sug.map(x=>`<li>${esc(t(x.k,x.v))}</li>`).join(''):`<li class="ok">${esc(t('engNoSug'))}</li>`;
  $('engChk').innerHTML=st.chk.map(x=>`<li class="${x.ok?'ok':'bad'}">${x.ok?'✓':'✗'} ${esc(t(x.k))}</li>`).join('');
  renderEngLog();updateEngControls();
  const sig=st.tag+'|'+st.msg+'|'+JSON.stringify(st.v);
  if(sig!==engSeen){engSeen=sig;clearTimeout(engTimer);engTimer=setTimeout(()=>{if(sig===engLogged)return;engLogged=sig;engLog.unshift({ts:Date.now(),lap:curLap,sev:st.sev,text:`${t(st.tag)} — ${t(st.msg,st.v)}`});engLog=engLog.slice(0,60);try{localStorage.setItem(LOG_KEY,JSON.stringify(engLog))}catch{}renderEngLog();playAlert(st.sev)},1200)}
}
function renderEngLog(){$('engLogList').innerHTML=engLog.length?engLog.map(e=>`<li class="${esc(e.sev)}"><time>${esc(new Date(e.ts).toLocaleTimeString(lang,{hour12:false}))}</time> <b>${e.lap?esc(t('lap'))+' '+e.lap:esc(t('engPre'))}</b> ${esc(e.text)}</li>`).join(''):`<li>${esc(t('engNoLog'))}</li>`}
function updateEngControls(){const b=$('engineer');b.classList.toggle('collapsed',eng.collapsed);$('engExtra').classList.toggle('hidden',!eng.more||eng.collapsed);$('engSound').textContent=eng.sound?'🔔':'🔕';$('engSound').setAttribute('aria-pressed',eng.sound);$('engSound').title=t('engSound');$('engVol').value=Math.round(eng.vol*100);$('engCollapse').textContent=eng.collapsed?'▾':'▴'}
function setLap(v){curLap=Math.max(0,Math.floor(v)||0);if(latest)curLap=Math.min(curLap,latest.raceN+1);engSave();engineerUpdate()}
$('engLap').addEventListener('input',e=>setLap(Number(e.target.value)));$('engNext').onclick=()=>setLap(curLap+1);$('engPrev').onclick=()=>setLap(curLap-1);$('engPre').onclick=()=>setLap(0);
$('engSound').onclick=()=>{eng.sound=!eng.sound;engSave();updateEngControls();if(eng.sound)playAlert('pit',true)};
$('engVol').oninput=e=>{eng.vol=Number(e.target.value)/100;engSave()};
$('engMore').onclick=()=>{eng.more=!eng.more;updateEngControls()};$('engCollapse').onclick=()=>{eng.collapsed=!eng.collapsed;engSave();updateEngControls()};
$('engClear').onclick=()=>{engLog=[];try{localStorage.removeItem(LOG_KEY)}catch{}renderEngLog()};

formatFields();applyLang(localStorage.getItem(LANG_KEY)||'auto',false);
