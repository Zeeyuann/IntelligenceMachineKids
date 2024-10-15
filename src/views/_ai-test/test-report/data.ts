import type { DataTableColumns } from 'naive-ui';
import type { ECOption } from '@/hooks/common/echarts';

export const pieOptions: ECOption = {
  grid: {
    containLabel: true
  },
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      radius: '100%',
      center: ['50%', '75%'],
      splitNumber: 16,
      axisLine: {
        lineStyle: {
          width: 40,
          color: [
            [0.1, '#F74D44'], // E - 10%
            [0.225, '#1B88EE'], // D - 12.5%
            [0.525, '#FAAD13'], // C - 30%
            [0.825, '#F7CC5B'], // B- 30%
            [1, '#2FBF78'] // A - 15%
          ]
        }
      },
      pointer: {
        show: false
      },
      splitLine: {
        show: false // 显示分割线
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 16,
        distance: 0, // 标签离轴线的距离
        rotate: 'tangential',
        formatter(value) {
          if (value === 93.75) {
            return 'A';
          } else if (value === 68.75) {
            // 修改刻度值使其均匀
            return 'B';
          } else if (value === 37.5) {
            return 'C';
          } else if (value === 18.75) {
            return 'D';
          } else if (value === 6.25) {
            return 'E';
          }
          return '';
        }
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 12
      },
      detail: {
        valueAnimation: true,
        formatter(value) {
          if (value >= 82.5 && value <= 100) {
            return 'A';
          } else if (value >= 52.5 && value < 82.5) {
            return 'B';
          } else if (value >= 22.5 && value < 52.5) {
            return 'C';
          } else if (value >= 10 && value < 22.5) {
            return 'D';
          } else if (value >= 0 && value < 10) {
            return 'E';
          }
          return '';
        },
        color: '#F7CC5B',
        fontSize: 24,
        offsetCenter: [0, '-35%']
      },
      data: [
        {
          value: 84, // 控制指针的位置
          name: '等级评定'
        }
      ]
    }
  ]
};

export const fullPieOptions: ECOption = {
  title: {
    text: '知识点分布',
    left: 'center',
    top: '45%',
    textStyle: {
      fontSize: 12,
      color: '#000'
    }
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    icon: 'circle',
    left: 'right',
    align: 'left',
    top: 'center',
    data: []
    // formatter(name) {
    //   return name;
    // }
  },
  emphasis: {
    disabled: true
  },
  series: [
    {
      name: '知识点分布',
      type: 'pie',
      radius: ['70%', '90%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 2 // 内外圆角都设置
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },

      labelLine: {
        show: false
      },
      data: [
        { value: 25, name: '', itemStyle: { color: '#ff6b6b' } },
        { value: 15, name: '', itemStyle: { color: '#4dabf7' } },
        { value: 20, name: '', itemStyle: { color: '#74c0fc' } },
        { value: 18, name: '', itemStyle: { color: '#c084fc' } },
        { value: 22, name: '', itemStyle: { color: '#38d9a9' } }
      ]
    }
  ]
};
export const chatPieOptions: ECOption = {
  title: {
    show: true,
    text: '知识点分布',
    left: 'center',
    top: '45%',
    textStyle: {
      fontSize: 12,
      color: '#000'
    }
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    icon: 'circle',
    left: 'right',
    align: 'auto',
    top: 'top',
    padding: [10, 0, 100, 0],
    data: []
    // formatter(name) {
    //   return name;
    // }
  },
  emphasis: {
    disabled: true
  },
  series: [
    {
      name: '知识点分布',
      type: 'pie',
      radius: ['70%', '50%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 2 // 内外圆角都设置
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },

      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: '', itemStyle: { color: '#ff6b6b' } },
        { value: 0, name: '', itemStyle: { color: '#4dabf7' } },
        { value: 0, name: '', itemStyle: { color: '#74c0fc' } },
        { value: 0, name: '', itemStyle: { color: '#c084fc' } },
        { value: 0, name: '', itemStyle: { color: '#38d9a9' } }
      ]
    }
  ]
};

export const lineOption: ECOption = {
  color: ['#4691CC', '#2FBF78'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  legend: {
    show: true,
    orient: 'horizontal',
    icon: 'circle',
    align: 'left',
    left: 'right',
    data: ['本次测试', '下次测试']
    // formatter(name) {
    //   return name;
    // }
  },
  xAxis: [
    {
      type: 'category',
      data: ['测试结果'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '本次测试',
      type: 'bar',
      data: []
    },
    {
      name: '下次测试',
      type: 'bar',
      data: []
    }
  ]
};

export function createColumns(): DataTableColumns {
  return [
    {
      title: '序号',
      key: 'key',
      render: (_, index) => {
        return `${index + 1}`;
      }
    },
    {
      title: '知识点',
      key: 'name'
    },
    {
      title: '正确率',
      key: 'age'
    },
    {
      title: '做对数',
      key: 'address'
    },
    {
      title: '掌握程度',
      key: 'tags',
      render() {
        return h(
          'div',
          {
            class: 'mi mr-10px h-20px w-54px flex-center rd-100px bg-#2FBF78 text-12px text-white'
          },
          {
            default: () => '掌握'
          }
        );
      }
    }
    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         size: 'small',
    //         onClick: () => sendMail(row)
    //       },
    //       { default: () => 'Send Email' }
    //     );
    //   }
    // }
  ];
}
export function createSubjectColumns(): DataTableColumns {
  return [
    {
      title: '难度系数',
      key: 'title'
    },
    {
      title: '题数',
      key: 'title'
    },
    {
      title: '占分',
      key: 'title'
    },
    {
      title: '做对数',
      key: 'title'
    },
    {
      title: '做错数',
      key: 'title'
    },
    {
      title: '正确率',
      key: 'title'
    }
    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         size: 'small',
    //         onClick: () => sendMail(row)
    //       },
    //       { default: () => 'Send Email' }
    //     );
    //   }
    // }
  ];
}
