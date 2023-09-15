import React, { useEffect, useState } from "react";
import { useMarkFormStepContext } from "../../../../../../../context/Admin/MarkFormStepContext";
import { useMutation } from "react-query";
import {
    getAllHandler,
    updateHandler,
} from "../../../../../../../utils/fetchHandlers";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const FormStepTwo = () => {
    const { setStepValue, stepOneValue, setStepTwovalue, selectedCourse } =
        useMarkFormStepContext();
    const [difference, setDifference] = useState(0);
    const [internalResult, setInternalResult] = useState({});
    const [isRollSelected, setIsRollSelected] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const rollWatch = watch(`roll`);
    const firstExaminerWatch = watch(`firstExaminer`);
    const secondExaminerWatch = watch(`secondExaminer`);

    const backButtonHandler = () => {
        setStepValue(1);
    };

    // checking mark difference
    useEffect(() => {
        if (
            firstExaminerWatch === undefined ||
            secondExaminerWatch === undefined ||
            firstExaminerWatch === "" ||
            secondExaminerWatch === ""
        ) {
            setDifference("...");
        } else {
            let firstExaminer = Number(firstExaminerWatch);
            let secondExaminer = Number(secondExaminerWatch);
            const difference = Math.abs(firstExaminer - secondExaminer);
            // if (difference >= 12) {
            //     setDifference(difference);
            // } else {
            //     setDifference("...");
            // }
            setDifference(difference);
        }
    }, [firstExaminerWatch, secondExaminerWatch]);

    useEffect(() => {
        if (rollWatch && rollWatch !== "" && rollWatch.length == 8) {
            setIsRollSelected(true);
            const url = `https://student-management-delta.vercel.app/mark/${stepOneValue.department}/${stepOneValue.semester}/${stepOneValue.course}/${rollWatch}`;
            getAllHandler(url)
                .then((res) => setInternalResult(res))
                .catch((err) => console.log(err));
        } else {
            setIsRollSelected(false);
            setInternalResult({});
        }
    }, [rollWatch]);

    useEffect(() => {
        if (internalResult?.firstExaminer) {
            setValue("firstExaminer", internalResult?.firstExaminer);
        } else {
            setValue("firstExaminer", "");
        }
        if (internalResult?.secondExaminer) {
            setValue("secondExaminer", internalResult?.secondExaminer);
        } else {
            setValue("secondExaminer", "");
        }
    }, [internalResult]);

    const addSingleImprovementMarkMutation = useMutation({
        mutationFn: updateHandler,
        onSuccess: (data, variable, context) => {
            toast.success("Mark Submitted");
            reset();
        },
        onError: (error, variables, context) => {
            console.log(error);
            // toast.warn(error.response.data.errors.common);
            toast.warn("Something Wrong");
        },
    });

    const onSubmit = (data) => {
        const result = {
            department: stepOneValue.department,
            semester: stepOneValue.semester,
            roll: data.roll,
            courseId: stepOneValue.course,
            firstExaminer: data.firstExaminer,
            secondExaminer: data.secondExaminer,
        };

        addSingleImprovementMarkMutation.mutate({
            body: result,
            url: "https://student-management-delta.vercel.app/mark/improve/single",
        });
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="capitalize text-center text-sm font-normal">
                    Jaitya kabi kazi nazrul islam university
                </h3>
                <h3 className=" text-center text-sm font-normal">
                    Department of {stepOneValue?.department}
                </h3>
                <div className="flex justify-center items-center gap-x-1">
                    <h3 className=" text-center text-sm font-normal">
                        Course Code: {selectedCourse?.courseCode},
                    </h3>
                    <h3 className=" text-center text-sm font-normal">
                        Course Title: {selectedCourse?.courseName}
                    </h3>
                </div>
                <div className="flex justify-center items-center gap-x-1">
                    <h3 className=" text-center text-sm font-normal">
                        Semester Final Marks,
                    </h3>
                    <h3 className=" text-center text-sm font-normal">
                        Session: {stepOneValue?.session}
                    </h3>
                </div>
            </div>
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-8 mark_wrapper">
                    <div className="mark_container">
                        <div className="mark">
                            <h3>Student Roll</h3>
                        </div>
                        <div className="mark">
                            <h3>First Examiner Mark</h3>
                        </div>
                        <div className="mark">
                            <h3>Second Examiner Mark</h3>
                        </div>
                        <div className="mark">
                            <h3>Difference</h3>
                        </div>

                        <React.Fragment>
                            <input
                                type="text"
                                {...register(`roll`)}
                                className="roll_field"
                            />
                            <input
                                type="text"
                                placeholder=""
                                {...register(`firstExaminer`)}
                                disabled={!isRollSelected}
                            />
                            <input
                                type="text"
                                placeholder=""
                                {...register(`secondExaminer`)}
                                disabled={!isRollSelected}
                            />

                            <span className="text-xs font-medium capitalize text-center text-red-700">
                                {difference}
                            </span>
                        </React.Fragment>
                    </div>
                </div>

                <div className="flex justify-center mt-8 gap-x-2">
                    <button
                        className="btn btn-sm bg-[#f44040] hover:bg-[#ea3333] rounded-sm text-white font-normal text-sm"
                        onClick={backButtonHandler}
                    >
                        back
                    </button>
                    <button
                        className="btn btn-sm bg-[#3ba550] hover:bg-[#2e763c] rounded-sm text-white font-normal text-sm"
                        type="submit"
                    >
                        submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormStepTwo;
