// CodePen에서 사용할 JavaScript 코드

const { useState, useEffect } = React;

// Lucide React 아이콘들을 SVG로 직접 구현
const ChevronRight = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m9 18 6-6-6-6" }));



const ChevronLeft = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m15 18-6-6 6-6" }));



const BarChart3 = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 13l4-4 4 4 6-6m0 0l-3 3m3-3v3" }));



const AlertTriangle = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" }));



const CheckCircle = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }));



const Trophy = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 21l4-7 4 7M3 11l18-8L11 14l-8 3z" }));



const Table = ({ className }) => /*#__PURE__*/
React.createElement("svg", { className: className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /*#__PURE__*/
React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }));



// 간단한 레이더 차트 구현 (Recharts 대신)
const SimpleRadarChart = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = 100;

  const angleStep = 2 * Math.PI / data.length;

  const getPoint = (value, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = value / 5 * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const pathData = data.map((item, index) => {
    const point = getPoint(item.score, index);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return /*#__PURE__*/(
    React.createElement("div", { className: "flex justify-center" }, /*#__PURE__*/
    React.createElement("svg", { width: size, height: size, className: "overflow-visible" },

    [1, 2, 3, 4, 5].map(level => {
      const points = data.map((_, index) => {
        const point = getPoint(level, index);
        return `${point.x},${point.y}`;
      }).join(' ');

      return /*#__PURE__*/(
        React.createElement("polygon", {
          key: level,
          points: points,
          fill: "none",
          stroke: "#e5e7eb",
          strokeWidth: "1" }));


    }),


    data.map((_, index) => {
      const endPoint = getPoint(5, index);
      return /*#__PURE__*/(
        React.createElement("line", {
          key: index,
          x1: center,
          y1: center,
          x2: endPoint.x,
          y2: endPoint.y,
          stroke: "#e5e7eb",
          strokeWidth: "1" }));


    }), /*#__PURE__*/


    React.createElement("path", {
      d: pathData,
      fill: "#FEE2E2",
      fillOpacity: "0.3",
      stroke: "#DC2626",
      strokeWidth: "2" }),



    data.map((item, index) => {
      const point = getPoint(item.score, index);
      return /*#__PURE__*/(
        React.createElement("circle", {
          key: index,
          cx: point.x,
          cy: point.y,
          r: "4",
          fill: "#DC2626",
          stroke: "#DC2626",
          strokeWidth: "2" }));


    }),


    data.map((item, index) => {
      const labelPoint = getPoint(5.5, index);
      return /*#__PURE__*/(
        React.createElement("text", {
          key: index,
          x: labelPoint.x,
          y: labelPoint.y,
          textAnchor: "middle",
          dominantBaseline: "middle",
          className: "text-xs fill-gray-700",
          fontSize: "12" },

        item.type));


    }))));



};

const BusinessModelDiagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // 키보드 이벤트 리스너 추가
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter' && !showResult) {
        event.preventDefault();
        if (answers[questions[currentStep].id]) {
          nextStep();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, answers, showResult]);

  // 숫자 키로 답변 선택 기능 추가
  useEffect(() => {
    const handleNumberKey = event => {
      if (!showResult && event.key >= '1' && event.key <= '5') {
        event.preventDefault();
        const score = parseInt(event.key);
        handleAnswer(score);
      }
    };

    document.addEventListener('keydown', handleNumberKey);
    return () => {
      document.removeEventListener('keydown', handleNumberKey);
    };
  }, [currentStep, showResult]);

  const questions = [
  // A. 가격 정책 (P1~P5)
  { id: 'P1', category: '가격 정책', text: '지난 12개월 목표 이익 달성에서 가격 인상 기여가 가장 컸다.' },
  { id: 'P2', category: '가격 정책', text: '가격 인상 전에 고객가치/차별화 개선이 선행되지 않았다.' },
  { id: 'P3', category: '가격 정책', text: '경쟁사 가격이 우리 가격 결정의 최우선 기준이다.' },
  { id: 'P4', category: '가격 정책', text: '평균 할인율이 상승 추세다(명목가만 올리고 실질가는 비슷/하락).' },
  { id: 'P5', category: '가격 정책', text: '가격 인상 이후 불만·이탈률이 눈에 띄게 증가했다.' },

  // B. 수익모델 (R1~R5)
  { id: 'R1', category: '수익모델', text: '상위 1개 제품이 매출의 50% 이상을 차지한다.' },
  { id: 'R2', category: '수익모델', text: '상위 5대 고객 매출 비중이 40% 이상이다.' },
  { id: 'R3', category: '수익모델', text: '매출의 대부분이 일회성 거래이며 구독/유지보수/서비스 비중이 낮다.' },
  { id: 'R4', category: '수익모델', text: '재구매·업셀·크로셀 매출 비중이 20% 미만이다.' },
  { id: 'R5', category: '수익모델', text: 'LTV/CAC를 추적하지 않거나 CAC 회수기간이 12개월 초과다.' },

  // C. 비용 구조 (C1~C5)
  { id: 'C1', category: '비용 구조', text: '고정비(급여·임차·설비리스 등)가 총비용의 60% 이상이다.' },
  { id: 'C2', category: '비용 구조', text: '수요 변동 시 가변화 수단(외주·사용량 기반 구매 등)이 제한적이다.' },
  { id: 'C3', category: '비용 구조', text: '가동률 75% 미만에서도 고정비 부담이 커 손익 급변한다.' },
  { id: 'C4', category: '비용 구조', text: '수익성 악화 시 즉시 절감 가능비용이 총비용의 10% 미만이다.' },
  { id: 'C5', category: '비용 구조', text: '활동/제품 단위의 원가관리(ABC, ZBB)를 적용하지 않는다.' },

  // D. 기술/경쟁력 (T1~T5)
  { id: 'T1', category: '기술/경쟁력', text: '핵심 기술·공정·서비스가 3년 이상 본질적 업데이트 없이 유지됐다.' },
  { id: 'T2', category: '기술/경쟁력', text: '자동화·디지털화로 단위비용을 낮춘 사례가 드물다.' },
  { id: 'T3', category: '기술/경쟁력', text: '신기술/규제 변화에도 가격·수익모델을 바꾼 적이 거의 없다.' },
  { id: 'T4', category: '기술/경쟁력', text: '신제품·신시장 R&D 비중이 매출의 1~3% 미만(업계 평균 대비 낮음).' },
  { id: 'T5', category: '기술/경쟁력', text: '데이터 기반 의사결정(가격·수요예측·이탈관리) 체계가 미흡하다.' }];


  const handleAnswer = score => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: score }));

  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    // 점수 계산
    const pScores = [1, 2, 3, 4, 5].map(i => answers[`P${i}`] || 0);
    const rScores = [1, 2, 3, 4, 5].map(i => answers[`R${i}`] || 0);
    const cScores = [1, 2, 3, 4, 5].map(i => answers[`C${i}`] || 0);
    const tScores = [1, 2, 3, 4, 5].map(i => answers[`T${i}`] || 0);

    const scores = {
      '가격 인상 의존형': pScores.reduce((a, b) => a + b, 0) / 5,
      '단일 수익원 의존형': 0.4 * rScores[0] + 0.4 * rScores[1] + 0.2 * rScores[3],
      '반복 수익 부재형': 0.5 * rScores[2] + 0.3 * rScores[4] + 0.2 * rScores[3],
      '고정비 과다형': cScores.reduce((a, b) => a + b, 0) / 5,
      '변화 저항형': tScores.reduce((a, b) => a + b, 0) / 5 };


    const maxScore = Math.max(...Object.values(scores));
    const maxType = Object.keys(scores).find(key => scores[key] === maxScore);

    const closeTypes = Object.keys(scores).filter((key) =>
    Math.abs(scores[key] - maxScore) <= 0.2 && scores[key] >= 3.0);


    setShowResult({ scores, maxType, maxScore, closeTypes });
  };

  const getScoreLevel = score => {
    if (score >= 3.8) return { level: '강함', color: 'text-red-600 bg-red-100', icon: AlertTriangle };
    if (score >= 3.3) return { level: '중간', color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
    if (score >= 3.0) return { level: '주의', color: 'text-yellow-500 bg-yellow-50', icon: AlertTriangle };
    return { level: '양호', color: 'text-green-600 bg-green-100', icon: CheckCircle };
  };

  const getTypeDescription = type => {
    const descriptions = {
      '가격 인상 의존형': {
        risk: '불만·이탈, 할인 확대로 실질가 하락, 브랜드 신뢰 약화',
        prescription: [
        '상위 3개 상품 가치지표 재정의 후 가치 기반 가격 재설계',
        '가격팩·번들링으로 할인율을 구조적으로 대체',
        '가격-수요 탄력성 미니실험(A/B)로 "올려도 되는 구간" 식별',
        '분기 할인 거버넌스 도입'] },


      '단일 수익원 의존형': {
        risk: '제품/고객 집중으로 수요 변동·이탈 시 수익 급락',
        prescription: [
        '매출 집중도 지표 월간 트래킹',
        '신규 세그먼트용 변형SKU/서비스 1개 파일럿',
        '크로셀 플레이북과 영업 인센티브 연동',
        '상위 5대 고객 의존 한도 정책화'] },


      '반복 수익 부재형': {
        risk: '매달 신규고객 의존, 예측 불가, 마케팅 효율 저하',
        prescription: [
        '핵심 제품의 구독/멤버십/유지관리 옵션 설계',
        'NRR(순매출유지율) 목표 설정과 리텐션 코호트 대시보드',
        '온보딩-리텐션 루프와 리페어·소모품 반복 동인 추가',
        'LTV/CAC·회수기간 월간 점검 체계화'] },


      '고정비 과다형': {
        risk: '매출 변동 시 이익 변동성 확대(운영 레버리지 과다)',
        prescription: [
        'ZBB로 필수·선택 비용 재분류, 변동화 계약으로 구조 전환',
        '가동률 손익분기표 도구 도입, 유휴자산 매각/공유',
        '가변 인력풀과 수요연동 발주 정책화',
        '제품/고객 단위 기여이익 리포트로 미수익 정리'] },


      '변화 저항형': {
        risk: '기술/시장 변화에 정체, 후발에 추월',
        prescription: [
        '탐색 예산 최소 매출의 3~5% 고정 배정, 빠른 파일럿',
        '가격·수익모델 실험 분기 1회',
        '데이터 인프라와 자동화 과제 3건 선정',
        '고객공동개발·베타그룹 운영, 학습 지표는 실패 속도'] } };



    return descriptions[type] || { risk: '', prescription: [] };
  };

  if (showResult) {
    const { scores, maxType, maxScore, closeTypes } = showResult;

    if (maxScore < 3.0) {
      return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4" },
      React.createElement('div', { className: "max-w-2xl mx-auto" },
      React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 text-center" },
      React.createElement(Trophy, { className: "w-20 h-20 text-yellow-500 mx-auto mb-6" }),
      React.createElement('h1', { className: "text-4xl font-bold text-green-600 mb-4" }, "짝짝짝! 🎉"),
      React.createElement('h2', { className: "text-2xl font-semibold text-gray-800 mb-6" }, "참 잘하고 있어요!"),
      React.createElement('p', { className: "text-lg text-gray-600 mb-8" },
      "모든 영역에서 건전한 비즈니스 모델을 유지하고 계시네요.",
      React.createElement('br'),
      "현재의 좋은 상태를 지속적으로 관리해 나가시기 바랍니다."),

      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" },
      Object.entries(scores).map(([type, score]) => {
        const { level, color } = getScoreLevel(score);
        return React.createElement('div', { key: type, className: `p-4 rounded-lg ${color}` },
        React.createElement('div', { className: "font-semibold" }, type),
        React.createElement('div', { className: "text-2xl font-bold" }, score.toFixed(1)),
        React.createElement('div', { className: "text-sm" }, level));

      })),

      React.createElement('button', {
        onClick: () => {setCurrentStep(0);setAnswers({});setShowResult(false);},
        className: "bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" },
      "다시 진단하기"))));



    }

    const resultType = closeTypes.length > 1 ? closeTypes.join(' + ') : maxType;
    const { level, color } = getScoreLevel(maxScore);
    const description = getTypeDescription(maxType);

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4" },
    React.createElement('div', { className: "max-w-4xl mx-auto" },
    React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8" },
    React.createElement('div', { className: "text-center mb-8" },
    React.createElement('h1', { className: "text-3xl font-bold text-gray-800 mb-4" }, "진단 결과"),
    React.createElement('div', { className: `inline-flex items-center px-6 py-3 rounded-full ${color} text-lg font-semibold` },
    React.createElement(AlertTriangle, { className: "w-6 h-6 mr-2" }),
    `${resultType} (${level})`),

    React.createElement('div', { className: "text-xl font-semibold text-gray-700 mt-2" },
    `위험도: ${maxScore.toFixed(1)}/5.0`)),


    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" },
    React.createElement('div', { className: "bg-red-50 p-6 rounded-lg" },
    React.createElement('h3', { className: "text-lg font-semibold text-red-800 mb-3 flex items-center" },
    React.createElement(AlertTriangle, { className: "w-5 h-5 mr-2" }),
    "핵심 리스크"),

    React.createElement('p', { className: "text-red-700" }, description.risk)),

    React.createElement('div', { className: "bg-blue-50 p-6 rounded-lg" },
    React.createElement('h3', { className: "text-lg font-semibold text-blue-800 mb-3 flex items-center" },
    React.createElement(CheckCircle, { className: "w-5 h-5 mr-2" }),
    "즉시 처방 (2주 내)"),

    React.createElement('ul', { className: "text-blue-700 space-y-2" },
    description.prescription.map((item, idx) =>
    React.createElement('li', { key: idx, className: "text-sm" }, `• ${item}`))))),




    // 점수 표와 레이더 차트
    React.createElement('div', { className: "bg-gray-50 p-6 rounded-lg mb-8" },
    React.createElement('h3', { className: "text-lg font-semibold text-gray-800 mb-6 flex items-center" },
    React.createElement(BarChart3, { className: "w-5 h-5 mr-2" }),
    "전체 점수 현황"),

    // 표
    React.createElement('div', { className: "mb-8" },
    React.createElement('h4', { className: "text-md font-semibold text-gray-700 mb-3 flex items-center" },
    React.createElement(Table, { className: "w-4 h-4 mr-2" }),
    "상세 점수표"),

    React.createElement('div', { className: "overflow-x-auto" },
    React.createElement('table', { className: "w-full bg-white rounded-lg shadow-sm" },
    React.createElement('thead', null,
    React.createElement('tr', { className: "bg-gray-100" },
    React.createElement('th', { className: "px-4 py-3 text-left font-semibold text-gray-700" }, "진단 유형"),
    React.createElement('th', { className: "px-4 py-3 text-center font-semibold text-gray-700" }, "점수"),
    React.createElement('th', { className: "px-4 py-3 text-center font-semibold text-gray-700" }, "위험도"),
    React.createElement('th', { className: "px-4 py-3 text-center font-semibold text-gray-700" }, "상태"))),


    React.createElement('tbody', null,
    Object.entries(scores).map(([type, score]) => {
      const { level, color } = getScoreLevel(score);
      const isHighest = score === maxScore;
      return React.createElement('tr', { key: type, className: `border-b border-gray-100 ${isHighest ? 'bg-red-50' : ''}` },
      React.createElement('td', { className: "px-4 py-3" },
      React.createElement('div', { className: "flex items-center" },
      isHighest && React.createElement(AlertTriangle, { className: "w-4 h-4 text-red-500 mr-2" }),
      React.createElement('span', { className: `font-medium ${isHighest ? 'text-red-700' : 'text-gray-800'}` }, type))),


      React.createElement('td', { className: "px-4 py-3 text-center" },
      React.createElement('span', { className: `text-xl font-bold ${isHighest ? 'text-red-600' : 'text-gray-800'}` },
      score.toFixed(1))),


      React.createElement('td', { className: "px-4 py-3 text-center" },
      React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-3" },
      React.createElement('div', {
        className: `h-3 rounded-full ${
        score >= 3.8 ? 'bg-red-500' :
        score >= 3.3 ? 'bg-yellow-500' :
        score >= 3.0 ? 'bg-yellow-300' : 'bg-green-500'
        }`,
        style: { width: `${score / 5 * 100}%` } }))),



      React.createElement('td', { className: "px-4 py-3 text-center" },
      React.createElement('span', {
        className: `px-3 py-1 rounded-full text-sm font-medium ${
        score >= 3.8 ? 'bg-red-100 text-red-700' :
        score >= 3.3 ? 'bg-yellow-100 text-yellow-700' :
        score >= 3.0 ? 'bg-yellow-50 text-yellow-600' : 'bg-green-100 text-green-700'
        }` },
      level)));


    }))))),




    // 레이더 차트
    React.createElement('div', null,
    React.createElement('h4', { className: "text-md font-semibold text-gray-700 mb-3 flex items-center" },
    React.createElement(BarChart3, { className: "w-4 h-4 mr-2" }),
    "위험도 레이더 차트"),

    React.createElement('div', { className: "bg-white rounded-lg p-6 shadow-sm" },
    React.createElement(SimpleRadarChart, {
      data: Object.entries(scores).map(([type, score]) => ({
        type: type.replace('형', ''),
        score: score,
        fullMark: 5 })) }),


    React.createElement('div', { className: "text-center mt-4 text-sm text-gray-600" },
    React.createElement('div', { className: "flex items-center justify-center space-x-4" },
    React.createElement('div', { className: "flex items-center" },
    React.createElement('div', { className: "w-4 h-4 bg-red-200 border-2 border-red-600 rounded mr-2" }),
    React.createElement('span', null, "위험도 점수 (최대 5.0)"))),


    React.createElement('p', { className: "mt-2 text-xs" }, "바깥쪽으로 갈수록 위험도가 높음을 의미합니다."))))),




    React.createElement('div', { className: "text-center" },
    React.createElement('button', {
      onClick: () => {setCurrentStep(0);setAnswers({});setShowResult(false);},
      className: "bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" },
    "다시 진단하기")))));




  }

  const progress = (currentStep + 1) / questions.length * 100;
  const currentQuestion = questions[currentStep];

  return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" },
  React.createElement('div', { className: "max-w-2xl mx-auto" },
  // Header
  React.createElement('div', { className: "text-center mb-8" },
  React.createElement('h1', { className: "text-3xl font-bold text-gray-800 mb-2" }, "비즈니스 모델 진단"),
  React.createElement('p', { className: "text-gray-600" }, "이익모델 5가지 유형을 진단합니다")),

  // Progress
  React.createElement('div', { className: "mb-8" },
  React.createElement('div', { className: "flex justify-between text-sm text-gray-600 mb-2" },
  React.createElement('span', null, `${currentStep + 1} / ${questions.length}`),
  React.createElement('span', null, `${Math.round(progress)}%`)),

  React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
  React.createElement('div', {
    className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
    style: { width: `${progress}%` } }))),



  // Question Card
  React.createElement('div', { className: "bg-white rounded-2xl shadow-xl p-8 mb-8" },
  React.createElement('div', { className: "mb-6" },
  React.createElement('div', { className: "text-sm text-blue-600 font-semibold mb-2" }, currentQuestion.category),
  React.createElement('h2', { className: "text-xl font-semibold text-gray-800 leading-relaxed" }, currentQuestion.text)),

  // Scale
  React.createElement('div', { className: "space-y-3" },
  React.createElement('div', { className: "text-center text-sm text-gray-600 mb-4" },
  "1 = 전혀 아니다 | 2 = 아니다 | 3 = 보통 | 4 = 그렇다 | 5 = 매우 그렇다",
  React.createElement('br'),
  React.createElement('span', { className: "text-xs text-blue-600 mt-1 block" },
  "💡 숫자 키(1-5) 또는 마우스 클릭으로 선택 후 Enter로 다음 문항")),


  React.createElement('div', { className: "flex justify-between items-center space-x-2" },
  [1, 2, 3, 4, 5].map((score) =>
  React.createElement('button', {
    key: score,
    onClick: () => handleAnswer(score),
    className: `w-full py-4 px-2 rounded-lg border-2 transition-all font-semibold ${
    answers[currentQuestion.id] === score ?
    'border-blue-500 bg-blue-50 text-blue-700' :
    'border-gray-200 hover:border-gray-300 text-gray-700'
    }` },

  React.createElement('div', { className: "text-2xl font-bold" }, score),
  React.createElement('div', { className: "text-xs mt-1" },
  score === 1 && '전혀 아니다',
  score === 2 && '아니다',
  score === 3 && '보통',
  score === 4 && '그렇다',
  score === 5 && '매우 그렇다')))))),






  // Navigation
  React.createElement('div', { className: "flex justify-between" },
  React.createElement('button', {
    onClick: prevStep,
    disabled: currentStep === 0,
    className: `flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
    currentStep === 0 ?
    'bg-gray-100 text-gray-400 cursor-not-allowed' :
    'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }` },

  React.createElement(ChevronLeft, { className: "w-5 h-5 mr-2" }),
  "이전"),

  React.createElement('button', {
    onClick: nextStep,
    disabled: !answers[currentQuestion.id],
    className: `flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
    !answers[currentQuestion.id] ?
    'bg-gray-100 text-gray-400 cursor-not-allowed' :
    'bg-blue-600 text-white hover:bg-blue-700'
    }` },

  currentStep === questions.length - 1 ? '결과 보기' : '다음',
  React.createElement(ChevronRight, { className: "w-5 h-5 ml-2" })))));




};

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BusinessModelDiagnostic));
