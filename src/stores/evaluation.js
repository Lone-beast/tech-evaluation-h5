import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEvaluationStore = defineStore('evaluation', () => {
  // 基础信息
  const grade = ref('')
  const hasCodingExperience = ref(null)

  // 编程学习经历
  const codingCourses = ref([])
  const codingDuration = ref('')
  const cspAward = ref('')

  // 能力评测答案
  const answers = ref({})
  const currentQuestionIndex = ref(0)

  // 结果
  const showResult = ref(false)
  const evaluationResult = ref(null)

  // 所有题目定义
  const questions = [
    {
      id: 1,
      type: 'grade',
      title: '📚 孩子现在是几年级？',
      options: [
        { label: '小学1-2年级', value: '1-2', score: 1 },
        { label: '小学3年级', value: '3', score: 3 },
        { label: '小学4年级', value: '4', score: 4 },
        { label: '小学5-6年级', value: '5-6', score: 5 },
        { label: '初中1-3年级', value: '7-9', score: 7 }
      ]
    },
    {
      id: 2,
      type: 'coding-experience',
      title: '💻 孩子之前学过编程吗？',
      options: [
        { label: '没学过', value: false },
        { label: '学过', value: true }
      ]
    },
    {
      id: 2.1,
      type: 'coding-courses',
      title: '📖 孩子学过哪些编程课程？（可多选）',
      options: [
        { label: '图形化编程（Scratch等）', value: '图形化' },
        { label: 'Python', value: 'Python' },
        { label: 'C++', value: 'C++' },
        { label: '其他', value: '其他' }
      ],
      isMultiple: true
    },
    {
      id: 2.2,
      type: 'coding-duration',
      title: '⏰ 学习了多长时间？',
      options: [
        { label: '3个月以内', value: '<3' },
        { label: '3-6个月', value: '3-6' },
        { label: '6个月-1年', value: '6-12' },
        { label: '1年以上', value: '>12' }
      ]
    },
    {
      id: 2.3,
      type: 'csp-award',
      title: '🏆 是否参加过CSP等竞赛？',
      options: [
        { label: '没参加过', value: null },
        { label: '参加过但未获奖', value: 'no-award' },
        { label: 'CSP-J 一等奖', value: 'CSP-J一等', award: true },
        { label: 'CSP-J 二等奖', value: 'CSP-J二等', award: true },
        { label: 'CSP-S 一等奖', value: 'CSP-S一等', award: true },
        { label: 'CSP-S 二等奖', value: 'CSP-S二等', award: true }
      ]
    },
    {
      id: 3,
      type: 'ability',
      dimension: 'logic',
      title: '💡 当孩子遇到难题时，他/她通常会怎么做？',
      options: [
        { label: '立即寻求老师帮助', value: 'A', score: 60 },
        { label: '自己反复思考尝试', value: 'B', score: 90 },
        { label: '换个角度重新思考', value: 'C', score: 85 },
        { label: '暂时放弃，以后再说', value: 'D', score: 50 }
      ]
    },
    {
      id: 4,
      type: 'ability',
      dimension: 'logic',
      title: '🧩 孩子喜欢玩需要推理和找出规律的游戏吗？（如数独、推理游戏）',
      options: [
        { label: '非常喜欢，经常玩', value: 'A', score: 90 },
        { label: '比较喜欢，偶尔玩', value: 'B', score: 75 },
        { label: '一般，不怎么玩', value: 'C', score: 60 },
        { label: '不喜欢，从不玩', value: 'D', score: 50 }
      ]
    },
    {
      id: 5,
      type: 'ability',
      dimension: 'creative',
      title: '🎨 孩子喜欢自己创作新东西吗？（如画画、手工、编故事）',
      options: [
        { label: '非常喜欢，经常有新想法', value: 'A', score: 90 },
        { label: '比较喜欢，偶尔创作', value: 'B', score: 75 },
        { label: '一般，需要引导', value: 'C', score: 60 },
        { label: '不太喜欢', value: 'D', score: 50 }
      ]
    },
    {
      id: 6,
      type: 'ability',
      dimension: 'creative',
      title: '💡 面对一个任务，孩子会尝试用不同方法完成吗？',
      options: [
        { label: '经常想出独特的方法', value: 'A', score: 90 },
        { label: '有时会尝试新方法', value: 'B', score: 75 },
        { label: '通常按固定方法做', value: 'C', score: 60 },
        { label: '总是跟着别人的方法', value: 'D', score: 50 }
      ]
    },
    {
      id: 7,
      type: 'ability',
      dimension: 'spatial',
      title: '🔷 孩子擅长拼图、积木、迷宫等空间游戏吗？',
      options: [
        { label: '非常擅长，很快完成', value: 'A', score: 90 },
        { label: '比较擅长，能完成', value: 'B', score: 75 },
        { label: '一般，需要花时间', value: 'C', score: 60 },
        { label: '不太擅长', value: 'D', score: 50 }
      ]
    },
    {
      id: 8,
      type: 'ability',
      dimension: 'spatial',
      title: '🧭 孩子在陌生地方的方向感如何？',
      options: [
        { label: '很好，很快能记住路线', value: 'A', score: 90 },
        { label: '还不错，多走几次能记住', value: 'B', score: 75 },
        { label: '一般，容易迷路', value: 'C', score: 60 },
        { label: '不太好，经常分不清方向', value: 'D', score: 50 }
      ]
    },
    {
      id: 9,
      type: 'ability',
      dimension: 'focus',
      title: '🎯 孩子做自己喜欢的事情时能专注多久？',
      options: [
        { label: '1小时以上，非常专注', value: 'A', score: 90 },
        { label: '30分钟-1小时，比较专注', value: 'B', score: 75 },
        { label: '10-30分钟，偶尔分心', value: 'C', score: 60 },
        { label: '10分钟以内，很难专注', value: 'D', score: 50 }
      ]
    },
    {
      id: 10,
      type: 'ability',
      dimension: 'communication',
      title: '👥 孩子在团队活动中表现如何？',
      options: [
        { label: '经常主动组织和协调', value: 'A', score: 90 },
        { label: '能积极参与，配合团队', value: 'B', score: 75 },
        { label: '偶尔参与，比较被动', value: 'C', score: 60 },
        { label: '不太喜欢团队活动', value: 'D', score: 50 }
      ]
    },
    {
      id: 11,
      type: 'ability',
      dimension: 'observation',
      title: '🔍 孩子喜欢问"为什么"并探索答案吗？',
      options: [
        { label: '经常问，喜欢探索', value: 'A', score: 90 },
        { label: '有时会问', value: 'B', score: 75 },
        { label: '偶尔问，需要引导', value: 'C', score: 60 },
        { label: '很少问', value: 'D', score: 50 }
      ]
    },
    {
      id: 12,
      type: 'ability',
      dimension: 'observation',
      title: '👀 孩子能注意到别人容易忽略的细节吗？',
      options: [
        { label: '经常发现别人没注意到的细节', value: 'A', score: 90 },
        { label: '有时会注意到', value: 'B', score: 75 },
        { label: '偶尔注意到', value: 'C', score: 60 },
        { label: '很少注意到', value: 'D', score: 50 }
      ]
    }
  ]

  // 计算当前应该显示的问题列表
  const displayQuestions = computed(() => {
    const baseQuestions = questions.slice(0, 2) // 前2题总是显示

    if (hasCodingExperience.value === true) {
      // 如果学过编程，显示编程经历题目
      return [...baseQuestions, ...questions.slice(2, 5)]
    } else if (hasCodingExperience.value === false) {
      // 如果没学过，直接跳到能力评测
      return [...baseQuestions, ...questions.slice(5)]
    }

    return baseQuestions
  })

  // 总题目数（动态）
  const totalQuestions = computed(() => displayQuestions.value.length)

  // 进度百分比
  const progress = computed(() => {
    return Math.round(((currentQuestionIndex.value + 1) / totalQuestions.value) * 100)
  })

  // 当前问题
  const currentQuestion = computed(() => {
    return displayQuestions.value[currentQuestionIndex.value]
  })

  // 设置答案
  function setAnswer(questionId, value) {
    const question = questions.find(q => q.id === questionId)

    if (questionId === 1) {
      grade.value = value
      answers.value[questionId] = value
    } else if (questionId === 2) {
      hasCodingExperience.value = value
      answers.value[questionId] = value
    } else if (questionId === 2.1) {
      codingCourses.value = value
      answers.value[questionId] = value
    } else if (questionId === 2.2) {
      codingDuration.value = value
      answers.value[questionId] = value
    } else if (questionId === 2.3) {
      cspAward.value = value
      answers.value[questionId] = value
    } else if (question && question.dimension) {
      if (!answers.value[question.dimension]) {
        answers.value[question.dimension] = []
      }
      answers.value[question.dimension].push({
        questionId,
        value,
        score: question.options.find(o => o.value === value)?.score || 0
      })
    }
  }

  // 下一题
  function nextQuestion() {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    } else {
      calculateResult()
      showResult.value = true
    }
  }

  // 上一题
  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }

  // 计算评测结果
  function calculateResult() {
    // 计算各维度得分
    const dimensions = {
      logic: calculateDimensionScore('logic'),
      creative: calculateDimensionScore('creative'),
      spatial: calculateDimensionScore('spatial'),
      focus: calculateDimensionScore('focus'),
      communication: calculateDimensionScore('communication'),
      observation: calculateDimensionScore('observation')
    }

    // 综合类型判断
    const type = determineGrowthType(dimensions)

    // 编程适配度
    const programmingMatch = calculateProgrammingMatch(dimensions)

    // 推荐课程
    const recommendedCourse = recommendCourse(dimensions)

    evaluationResult.value = {
      dimensions,
      type,
      programmingMatch,
      recommendedCourse,
      grade: grade.value,
      hasCodingExperience: hasCodingExperience.value,
      codingCourses: codingCourses.value,
      codingDuration: codingDuration.value,
      cspAward: cspAward.value
    }
  }

  function calculateDimensionScore(dimension) {
    const dimensionAnswers = answers.value[dimension]
    if (!dimensionAnswers || dimensionAnswers.length === 0) return 0

    const total = dimensionAnswers.reduce((sum, answer) => sum + answer.score, 0)
    return Math.round(total / dimensionAnswers.length)
  }

  function determineGrowthType(dimensions) {
    const maxScore = Math.max(...Object.values(dimensions))

    if (dimensions.logic >= 85) return '逻辑思维型'
    if (dimensions.spatial >= 85) return '空间想象型'
    if (dimensions.creative >= 85) return '创意创造型'
    if (dimensions.focus >= 85) return '专注坚持型'
    if (dimensions.communication >= 85) return '协作沟通型'
    if (dimensions.observation >= 85) return '观察探索型'

    return '综合发展型'
  }

  function calculateProgrammingMatch(dimensions) {
    const avgScore = Object.values(dimensions).reduce((a, b) => a + b, 0) / 6
    const stars = Math.round(avgScore / 20)
    return {
      score: Math.round(avgScore),
      stars: Math.min(5, Math.max(1, stars))
    }
  }

  function recommendCourse(dimensions) {
    const gradeNum = parseInt(grade.value) || 0

    // 如果有编程经历
    if (hasCodingExperience.value) {
      if (codingCourses.value.includes('C++') && cspAward.value) {
        return {
          course: 'C++',
          courseType: '竞赛强化',
          reason: `孩子已有C++基础和${cspAward.value}获奖经历，建议参加竞赛强化训练，冲刺更高奖项`
        }
      }

      if (codingCourses.value.includes('C++')) {
        return {
          course: 'C++',
          courseType: '竞赛基础',
          reason: '孩子C++基础不错，建议继续夯实基础，为竞赛做准备'
        }
      }

      if (codingCourses.value.includes('Python') && cspAward.value) {
        return {
          course: 'C++',
          courseType: '竞赛',
          reason: '孩子已具备编程基础和竞赛经验，建议转向C++竞赛方向，冲刺信息学奥赛'
        }
      }

      if (codingCourses.value.includes('Python')) {
        return {
          course: 'Python',
          courseType: '进阶',
          reason: '孩子Python基础良好，建议继续深入学习，不要中断学习进度'
        }
      }

      if (codingCourses.value.includes('图形化')) {
        return {
          course: 'Python',
          courseType: '体验',
          reason: '孩子已经掌握图形化基础，现在可以过渡到Python代码编程'
        }
      }
    }

    // 无编程经历，根据年级推荐
    if (gradeNum <= 3) {
      return {
        course: '图形化',
        courseType: '体验',
        reason: '孩子处于培养兴趣的关键期，图形化编程能让TA在拖拽中学习编程思维'
      }
    }

    if (dimensions.logic >= 85) {
      return {
        course: 'Python',
        courseType: '体验',
        reason: '孩子逻辑思维强，推荐学习Python，培养编程思维，为升学和竞赛做准备'
      }
    }

    if (dimensions.spatial >= 85) {
      return {
        course: 'C++',
        courseType: '体验',
        reason: '孩子空间想象力出众，C++算法竞赛是最佳选择，为信息学奥赛奠定基础'
      }
    }

    return {
      course: 'Python',
      courseType: '体验',
      reason: '建议从Python开始学习，简单易上手，快速建立编程自信'
    }
  }

  // 重置评测
  function reset() {
    grade.value = ''
    hasCodingExperience.value = null
    codingCourses.value = []
    codingDuration.value = ''
    cspAward.value = ''
    answers.value = {}
    currentQuestionIndex.value = 0
    showResult.value = false
    evaluationResult.value = null
  }

  return {
    // 状态
    grade,
    hasCodingExperience,
    codingCourses,
    codingDuration,
    cspAward,
    answers,
    currentQuestionIndex,
    showResult,
    evaluationResult,
    questions,
    displayQuestions,
    totalQuestions,
    progress,
    currentQuestion,
    // 方法
    setAnswer,
    nextQuestion,
    prevQuestion,
    reset
  }
})
