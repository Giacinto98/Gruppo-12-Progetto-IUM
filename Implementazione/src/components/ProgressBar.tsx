import { motion } from "framer-motion";

interface Props {
  total: number;
  completed: number;
  /** show label as completed/total left to progress bar */
  showLabel: boolean;
}

const ProgressBar = ({ total, completed, showLabel }: Props) => {
  return (
    <div className={`flex items-center  w-full ${showLabel && "space-x-5 md:space-x-10"}`}>
      {showLabel && (
        <span>
          {completed}/{total}
        </span>
      )}
      <div className="w-[90%] xl:w-full h-[14px] rounded-lg bg-accent-purple-tint">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${completed / (total / 100)}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="h-[14px] rounded-lg bg-accent-purple"
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
